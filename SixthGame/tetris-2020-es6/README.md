Brunch with Phaser 3 (ES6)
====================

A [Brunch](http://brunch.io) skeleton for making games with [Phaser 3](http://phaser.io) and [ES6/ES2016][2].
([Why Brunch?](http://brunch.io/docs/why-brunch))

    brunch new <project> -s samme/brunch-phaser-es6

This is the ES6 variant of [brunch-phaser](https://github.com/samme/brunch-phaser).

Get started
-----------

- Install (if you don't have them):
  - [Node.js](https://nodejs.org)
  - [Brunch](http://brunch.io): `npm install -g brunch`
- Run:
  - `brunch new <project> -s samme/brunch-phaser-es6`
  - `npm run start` or `brunch watch --server` watches the project with continuous rebuild.
  - `npm run build` or `brunch build --production` builds a minified project for production.
  - [troubleshooting](http://brunch.io/docs/troubleshooting)
- Make:
  - Write your code in [app](app).
  - Put game assets in [assets](app/static/assets).

Phaser
------

Phaser is managed through [npm](https://docs.npmjs.com/cli/npm).

    npm view phaser version

Update with:

    npm update

### Other builds

See the `npm.static` entry in [brunch-config](./brunch-config.coffee).

Add NPM packages
----------------

    npm install -S <package-name>

and then [import][1] as appropriate in your code.

If these packages should be transpiled from ES6 as well, remove or modify `plugins.babel.ignore` in [brunch-config](./brunch-config.coffee).

Settings
--------

- [brunch](http://brunch.io/docs/config)
- [babel-brunch](https://www.npmjs.com/package/babel-brunch#configuration)
- [uglify-js-brunch](https://www.npmjs.com/package/uglify-js-brunch#usage)
  - [minify options](https://www.npmjs.com/package/uglify-js#minify-options)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla
