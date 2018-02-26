#!/usr/bin/env node

require('babel-polyfill');

import App from './App';
import winston from 'winston';

winston.level = 'debug';

try {
    main();
} catch (err) {
    winston.error('exception! ' + err.message);
    winston.error('programme exits!');
    process.exit(1);
}

/*

 */

function main() {
    winston.debug(`project locates in ${__dirname}`);
    winston.debug(`programme runs in ${process.env.PWD}`);

    let theApp = new App();

    theApp.run();

    //winston.info('Execute programme successfully!');
}

