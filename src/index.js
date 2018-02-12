#!/usr/bin/env node

require('babel-polyfill');

import App from './App';
import program from 'caporal';

export const logger = program.logger();

try {
    main();
} catch (err) {
    logger.error('exception! ' + err.message);
    logger.error('programme exits!');
    process.exit(1);
}

/*

 */

function main() {
    //logger.debug(`${__dirname}`);

    let theApp = new App();

    theApp.run();

    logger.info('Execute programme successfully!');
}

