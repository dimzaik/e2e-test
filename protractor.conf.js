exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //for protractor test
  specs: ['protractor/converter.js', 'protractor/*.spec.js'],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }],
  onPrepare: function() {
    var jasmineReporters = require('jasmine-reporters');
    var fs = require('fs-extra');

    fs.emptyDir('protractor/reports/screenshots/', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter({
            specDone: function(result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream('protractor/reports/screenshots/' + browserName + '-' + browserName + '.'+ result.fullName+ '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });

    return browser.getProcessedConfig().then(function(config) {
      var browserName = config.capabilities.browserName;

      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: 'protractor/reports/testresults',
        filePrefix: browserName + '-xmloutput',
        modifySuiteName: function(generatedSuiteName, suite) {
          return browserName + '.' + generatedSuiteName;
        }
      });
      jasmine.getEnv().addReporter(junitReporter);
    });



  },
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function(caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');

      var HTMLReport = require('protractor-html-reporter');

      testConfig = {
        reportTitle: 'Test Execution Report with Protractor',
        outputPath: './protractor/reports/',
        screenshotPath: './protractor/screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true
      };
      new HTMLReport().from('protractor/reports/testresults/' + browserName + '-xmloutput.xml', testConfig);
    });
  }
}
