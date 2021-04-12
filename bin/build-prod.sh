#!/bin/sh

set -eu

# build front end
grafana-toolkit plugin:build

# build back end
mage -v

# remove images not used in plugin.json
used_screenshots_arr=(`echo $(jq -r '.info.screenshots[].path' 'dist/plugin.json' | sed -En 's/(.*)/dist\/\1/p')`)
mkdir dist/tmp
for image in ${used_screenshots_arr[@]};do cp -- "$image" dist/tmp;done
rm -r dist/image
mv dist/tmp dist/image

# check if zip file exists
version="$(jq -r '.info.version' 'dist/plugin.json')"

if test -f "tencentcloud-monitor-app-${version}.zip"
then
	printf >&2 'File already exists: %s\n' "tencentcloud-monitor-app-${version}.zip"
	exit 1
fi

# check if GRAFANA_API_KEY available
if [ -z ${GRAFANA_API_KEY+x} ]
then
	echo >&2 'GRAFANA_API_KEY must be set.'
fi

# sign
npm run sign

# bundle zip file
tmp="$(mktemp -d)"
cp -r -- dist "${tmp}/tencentcloud-app"

(
	cd -- "$tmp"
	zip -qr "tencentcloud-monitor-app-${version}.zip" -- 'tencentcloud-app'
)

mv -- "$tmp/tencentcloud-monitor-app-${version}.zip" .
