require('babel-register');

// import {argv} from 'yargs';
// import config from '../config';
// import webpackConfig from './webpack.config';
// import _debug from 'debug';
const {argv} = require('yargs');
const config = require('./config').default;
const webpackConfig = require('./webpack.config').default;
const _debug = require('debug');

const debug = _debug('app:karma');
debug('Create configuration.');

const karmaConfig = {
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true,
    },
    // {
    //   pattern: `./${config.dir_test}/**/*.spec.js`,
    //   watched: false,
    //   served: true,
    //   included: true,
    // },
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack'],
    // [`${config.dir_test}/**/*.spec.js`]: ['webpack'],
  },
  browsers: ['PhantomJS'],
  // plugins: [
  //   'karma-mocha', 'karma-mocha-reporter', 'karma-webpack', 'karma-phantomjs-launcher',
  // ],
  webpack: webpackConfig,
  webpackMiddleware: {
    // noInfo: true,
    stats: 'errors-only',
  },
  coverageReporter: {
    reporters: config.coverage_reporters,
  },
};

if (config.globals.__COVERAGE__) { // eslint-disable-line no-underscore-dangle
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/,
  }];
}

console.log(karmaConfig);

// cannot use `export default` because of Karma.
module.exports = cfg => cfg.set(karmaConfig);
