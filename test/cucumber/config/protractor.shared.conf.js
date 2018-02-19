const path = require('path');

exports.config = {

    framework: 'custom',
	seleniumAddress: 'http://localhost:4444/wd/hub',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: [
            path.resolve(process.cwd(), '../step_definitions/steps.js')
        ],
        format: 'json:../results.json',
        strict: true
    },

    specs: [
        path.resolve(process.cwd(), '../features/*.feature')
    ]
};
