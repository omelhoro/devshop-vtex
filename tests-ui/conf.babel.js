// conf.js

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: process.env.TEST_BROWSER || 'chrome',
    chromeOptions: {
      args: [
        '--window-workspace=3',
      ],
    },
  },
  onPrepare() {
    browser.ignoreSynchronization = true; // eslint-disable-line no-undef
  },
  specs: ['*.ls'],
};
