const
    glob         = require('glob'),
    protractor   = require.resolve('protractor'),
    node_modules = protractor.substring(0, protractor.lastIndexOf('node_modules') + 'node_modules'.length);
    seleniumJar  = glob.sync(`${node_modules}/protractor/**/selenium-server-standalone-*.jar`).pop();
	const crew = require('./node_modules/serenity-js/lib/stage_crew');
exports.config = {
	
	serenity: {
		crew:    [
            crew.serenityBDDReporter(),
            crew.photographer()
        ],
        dialect: 'cucumber',  // or 'mocha'
    },
	
	requirementsDirectory: '${process.cwd()}/features',
	outputDirectory: '${process.cwd()}/target/site/serenity/',

    baseUrl: 'https://angular.io/',

    seleniumServerJar: seleniumJar,
	//seleniumAddress: 'http://localhost:4444/wd/hub',
    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    disableChecks: true,

    // https://github.com/protractor-cucumber-framework/protractor-cucumber-framework#uncaught-exceptions
    ignoreUncaughtExceptions: true,

    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),

    specs: [ 
	'serenity/features/**/*.feature',
	'serenity/features/**/*.js'	],

    cucumberOpts: {
        format:     'pretty',
        compiler:   'ts:ts-node/register'
    },

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                'disable-infobars'
                // 'incognito',
                // 'disable-extensions',
                // 'show-fps-counter=true'
            ]
        }
    }
};