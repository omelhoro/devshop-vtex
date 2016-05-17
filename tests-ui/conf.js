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
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },
  specs: ['*.ls'],
};
