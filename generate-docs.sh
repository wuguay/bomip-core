rm -rf temp &> /dev/null
mkdir temp &> /dev/null
tsc --outDir ./temp/ --target es6
$(npm bin)/jsdoc2md -l js --no-cache --source "$(cat ./temp/imports/bomip-core.module.js)" > ./docs/module.md
rm -rf temp &> /dev/null
