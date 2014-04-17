exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

//  capabilities: {
//    'browserName': 'chrome'
//  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  chromeOnly: true, //keep true here, or you have to comment on multiCapabilities.

  multiCapabilities: [
  {'browserName': 'chrome'},
 //{'browserName': 'internet explorer' },
  {'browserName': 'firefox' },
  {'browserName': 'safari' }, //not installed
  ],

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: true,
  }
};
