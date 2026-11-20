## Install apk
`````
apk add --allow-untrusted /root/*.apk
`````
## Terapkan tema
`````
uci set luci.main.mediaurlbase='/luci-static/KIHEO_brutalism'
uci commit luci
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache
`````
## Install ipk

`````
opkg install /root/luci-theme-kiheo-brutalism*.ipk
`````
## Uninstall 
`````
apk del luci-theme-kiheo-brutalism

`````
`````
opkg remove luci-theme-kiheo-brutalism
`````
### otomatis install apk
`````
wget -O /tmp/luci-theme-kiheo-brutalism-1.0.0-r1.apk https://github.com/Kiel-P/Tema/releases/download/v1.0.0/luci-theme-kiheo-brutalism-1.0.0-r1.apk && apk add --allow-untrusted /tmp/luci-theme-kiheo-brutalism-1.0.0-r1.apk && rm -f /tmp/luci-theme-kiheo-brutalism-1.0.0-r1.apk

`````
### otomatis install ipk
`````
wget -O /tmp/luci-theme-kiheo-brutalism.ipk https://github.com/Kiel-P/Tema/releases/download/v1.0.0/luci-theme-kiheo-brutalism_1.0.0-1_all.ipk && opkg install /tmp/luci-theme-kiheo-brutalism.ipk && rm -f /tmp/luci-theme-kiheo-brutalism.ipk
`````