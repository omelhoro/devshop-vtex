// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capatibilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--window-workspace=3',
      ],
    },
  },
  specs: ['*.ls'],
};
