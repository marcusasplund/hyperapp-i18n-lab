# hyperapp-i18n-lab
[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/hyperapp-i18n-lab.svg)](https://github.com/marcusasplund/hyperapp-i18n-lab/issues)
[![Build status](https://travis-ci.org/marcusasplund/hyperapp-i18n-lab.svg?branch=master)](https://travis-ci.org/marcusasplund/hyperapp-i18n-lab)
[![dependencies](https://david-dm.org/marcusasplund/hyperapp-i18n-lab.svg)](https://david-dm.org/marcusasplund/hyperapp-i18n-lab)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[Hyperapp](https://github.com/hyperapp/hyperapp) i18n playground, wip

## [Demo](https://pap.as/hyperapp/lang/)


Offline support with service worker

TODO: ~~[a bug in parcel](https://github.com/parcel-bundler/parcel/issues/235) rewrites the manifest.json to a js file~~ so the pwa requirements fails. Also the meta tags and icons are rewritten https://github.com/parcel-bundler/parcel/issues/220
To build a proper PWA you now have to manually copy the <meta> tags in the head from src/index.html, and also copy the icons with their proper names.

## installation

````bash
    $ git clone https://github.com/marcusasplund/hyperapp-i18n-lab.git

    $ cd hyperapp-i18n-lab

    $ yarn

    $ yarn start
````

Open up application at http://localhost:3000/ in browser

## build a release

````bash
    $ yarn build

````
This will generate a release directory with your minified/rev'd assets.
