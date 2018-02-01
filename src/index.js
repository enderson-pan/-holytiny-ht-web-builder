#!/usr/bin/env node

require('babel-polyfill');

import logger from 'winston';
import ConfigFile from './ConfigFile';

logger.level = 'debug';

try {
    main();
} catch (err) {
    console.log(err.message);
    console.log('programme exits.');
}

/*

 */

function main() {
    logger.debug(`${__dirname}`);
    let configFile = new ConfigFile();
    logger.debug(configFile.configFilePath);
}

