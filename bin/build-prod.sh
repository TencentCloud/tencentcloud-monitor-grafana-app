#!/bin/sh

set -eu

# route validation
npm run validate

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

plugin_id="tencentcloud-monitor-app"

# check if zip file exists
version="$(jq -r '.info.version' 'dist/plugin.json')"

if test -f "${plugin_id}-${version}.zip"
then
	printf >&2 'File already exists: %s\n' "${plugin_id}-${version}.zip"
	exit 1
fi

# check if GRAFANA_API_KEY available
if [ -z ${GRAFANA_API_KEY+x} ]
then
	echo >&2 "GRAFANA_API_KEY must be set."
fi

# sign
npm run sign

# bundle zip file
tmp="$(mktemp -d)"
cp -r -- dist "${tmp}/${plugin_id}"

(
	cd -- "$tmp"
	zip -qr "${plugin_id}-${version}.zip" -- "${plugin_id}"
)

mv -- "$tmp/${plugin_id}-${version}.zip" .
