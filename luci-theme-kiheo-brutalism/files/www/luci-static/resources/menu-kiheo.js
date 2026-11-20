'use strict';
'require baseclass';
'require ui';

return baseclass.extend({
	__init__: function() {
		ui.menu.load().then(L.bind(this.render, this));
	},

	render: function(tree) {
		var node = tree,
		    url = '';

		this.renderModeMenu(tree);

		if (L.env.dispatchpath && L.env.dispatchpath.length >= 3) {
			for (var i = 0; i < 3 && node; i++) {
				node = node.children ? node.children[L.env.dispatchpath[i]] : null;
				url += (url ? '/' : '') + L.env.dispatchpath[i];
			}

			if (node)
				this.renderTabMenu(node, url);
		}
		else if (L.env.dispatchpath && L.env.dispatchpath.length === 2) {
			for (var j = 0; j < 2 && node; j++) {
				node = node.children ? node.children[L.env.dispatchpath[j]] : null;
				url += (url ? '/' : '') + L.env.dispatchpath[j];
			}

			if (node) {
				var secChildren = ui.menu.getChildren(node);
				if (secChildren.length > 0)
					this.renderTabMenu(secChildren[0], url + '/' + secChildren[0].name);
			}
		}

		this.renderMainMenu(tree, url);
	},

	renderTabMenu: function(tree, url, level) {
		var container = document.querySelector('#tabmenu'),
		    l = (level || 0) + 1,
		    ul = E('ul', { 'class': 'tabs' }),
		    children = ui.menu.getChildren(tree),
		    activeNode = null;

		if (!container || children.length === 0)
			return E([]);

		for (var i = 0; i < children.length; i++) {
			var isActive = (L.env.dispatchpath[l + 2] == children[i].name),
			    activeClass = isActive ? ' active' : '',
			    className = 'tabmenu-item-%s %s'.format(children[i].name, activeClass);

			ul.appendChild(E('li', { 'class': className }, [
				E('a', { 'href': L.url(url, children[i].name) }, [ _(children[i].title) ])
			]));

			if (isActive)
				activeNode = children[i];
		}

		container.appendChild(ul);
		container.style.display = 'block';

		setTimeout(function() {
			var actEl = ul.querySelector('li.active');
			if (actEl && typeof actEl.scrollIntoView === 'function') {
				try { actEl.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {}
			}
		}, 40);

		if (activeNode)
			container.appendChild(this.renderTabMenu(activeNode, url + '/' + activeNode.name, l));

		return ul;
	},

	renderMainMenu: function(tree, url) {
		var navRoot = document.querySelector('#argon-nav');
		if (!navRoot || !tree || !tree.children)
			return;

		var rootKey = (L.env.dispatchpath && L.env.dispatchpath[0] && tree.children[L.env.dispatchpath[0]])
			? L.env.dispatchpath[0]
			: 'admin';
		var topNode = tree.children[rootKey] || tree;
		var sections = ui.menu.getChildren(topNode);

		navRoot.innerHTML = '';

		for (var i = 0; i < sections.length; i++) {
			(function(sec) {
				var children = ui.menu.getChildren(sec);
				var li = document.createElement('li');
				var isCurrentSec = (L.env.dispatchpath && L.env.dispatchpath[1] === sec.name);

				if (isCurrentSec)
					li.classList.add('active', 'open');

				var a = document.createElement('a');
				a.className = 'menu-parent';
				a.innerHTML = '<span>' + _(sec.title) + '</span>' + (children.length ? '<span class="arrow">▶</span>' : '');

				if (children.length > 0) {
					a.href = '#';
					a.addEventListener('click', function(ev) {
						ev.preventDefault();
						var wasOpen = li.classList.contains('open');
						var openItems = navRoot.querySelectorAll(':scope > li.open');
						for (var k = 0; k < openItems.length; k++) {
							if (openItems[k] !== li)
								openItems[k].classList.remove('open');
						}
						li.classList.toggle('open', !wasOpen);
					});

					var ul = document.createElement('ul');
					ul.className = 'slide-menu';

					for (var j = 0; j < children.length; j++) {
						var child = children[j];
						var cli = document.createElement('li');
						var ca = document.createElement('a');
						ca.href = L.url(rootKey, sec.name, child.name);
						ca.textContent = _(child.title);

						if (isCurrentSec && L.env.dispatchpath[2] === child.name) {
							cli.classList.add('active');
							li.classList.add('active', 'open');
						}

						cli.appendChild(ca);
						ul.appendChild(cli);
					}

					li.appendChild(a);
					li.appendChild(ul);
				}
				else {
					a.href = L.url(rootKey, sec.name);
					li.appendChild(a);
				}

				navRoot.appendChild(li);
			})(sections[i]);
		}
	},

	renderModeMenu: function(tree) {
		var ul = document.querySelector('#modemenu'),
		    children = ui.menu.getChildren(tree);

		if (!ul || children.length <= 1)
			return;

		for (var i = 0; i < children.length; i++) {
			var isActive = (L.env.requestpath && L.env.requestpath[0] == children[i].name);
			ul.appendChild(E('li', { 'class': isActive ? 'active' : null }, [
				E('a', { 'href': L.url(children[i].name) }, [ _(children[i].title) ])
			]));
		}

		ul.style.display = '';
	}
});
