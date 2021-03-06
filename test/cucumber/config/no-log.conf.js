const path = require('path');
const config = require('./protractor.shared.conf').config;

config.multiCapabilities = [{
    browserName: 'chrome',
    shardTestFiles: false,
    maxInstances: 2,
    chromeOptions: {
        args: ['disable-infobars']
    },
    deviceProperties: {
        browser: {
            name: 'chrome',
            version: 'latest'
        },
        device: 'local development machine',
        platform: {
            name: 'osx',
            version: '10.12.6'
        }
    }
}];

config.plugins = [{
    path: path.resolve(process.cwd(), './'),
    options: {
        automaticallyGenerateReport: true,
        disableLog: true
    }
}];

exports.config = config;
