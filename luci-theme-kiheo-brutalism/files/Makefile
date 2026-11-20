include $(TOPDIR)/rules.mk

PKG_NAME:=luci-theme-kiheo-brutalism
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_MAINTAINER:=KIHEO
PKG_LICENSE:=MIT

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Themes
  TITLE:=LuCI KIHEO Brutalism Theme
  DEPENDS:=+luci-base
  PKGARCH:=all
endef

define Package/$(PKG_NAME)/description
  Neo-Brutalism LuCI theme KIHEO_brutalism for OpenWrt.
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(CP) ./files/* $(1)/
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	uci set luci.themes.KIHEO_brutalism='/luci-static/KIHEO_brutalism'
	uci commit luci
	/etc/init.d/rpcd reload >/dev/null 2>&1 || true
}
exit 0
endef

define Package/$(PKG_NAME)/prerm
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	cur_theme="$$(uci -q get luci.main.mediaurlbase)"
	if [ "$$cur_theme" = "/luci-static/KIHEO_brutalism" ]; then
		uci set luci.main.mediaurlbase='/luci-static/bootstrap'
	fi
	uci delete luci.themes.KIHEO_brutalism 2>/dev/null || true
	uci commit luci
}
exit 0
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
