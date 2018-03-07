/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel
['es', 'cjs', 'umd'].forEach((format) => {
  promise = promise.then(() => rollup.rollup({
    entry: 'src/index.js',
    external: Object.keys(pkg.dependencies),
    plugins: [babel(Object.assign(pkg.babel, {
      babelrc: false,
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: pkg.babel.presets.map(x => (x === 'latest' ? ['latest', { es2015: { modules: false } }] : x)),
    }))],
  }).then(bundle => bundle.write({
    file: `dist/${format === 'cjs' ? 'aspnet-auth' : `aspnet-auth-${format}`}.js`,
    format,
    name: format === 'umd' ? pkg.name : undefined,
  })));
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
