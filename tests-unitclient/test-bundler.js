// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
require('babel-register');

console.log('test-bundler');
// var sinon = require( 'sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const chaiEnzyme = require('chai-enzyme');

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
// global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
// NOTE: `new Array()` is used rather than an array literal since
// for some reason an array literal without a trailing `;` causes
// some build environments to fail.
var __karmaWebpackManifest__ = new Array() // eslint-disable-line
const inManifest = path => ~__karmaWebpackManifest__.indexOf(path);

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/);

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest);
(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
if (__COVERAGE__) {
  const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/);
  componentsContext.keys().forEach(componentsContext);
}
