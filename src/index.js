#!/usr/bin/env node

require('babel-polyfill');

import logger from 'winston';
import theConfigFile from './ConfigFile';

import BabelCli from './Transpiler/Babel/Babel';
import Parser from './Parser';


logger.level = 'debug';

try {
    main();
} catch (err) {
    logger.error('exception! ' + err.message);
    logger.error('programme exits!');
}

/*

 */

function main() {
    logger.debug(`${__dirname}`);

    const babelCli = new BabelCli();
    logger.debug('Is windows?' + babelCli.isWindows());


    theConfigFile.addCommandLineTool(babelCli);

    let parser = new Parser();
    let parseRes = parser.grammarList();

    logger.info('the end of the programme');
}

