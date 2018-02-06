#!/usr/bin/env node

require('babel-polyfill');

import logger from 'winston';

import ConfigFile from './ConfigFile';
import Parser from './Parser';
import Generator from './Generator';
import ReflectionFactory from './ReflectionFactory';

import Babel from './Transpiler/Babel/Babel';
import Nodemon from './Executor/Nodemon/Nodemon';
import Deployer from './Deployer/Deployer';





logger.level = 'debug';

try {
    before_main();
    main();
} catch (err) {
    logger.error('exception! ' + err.message);
    logger.error('programme exits!');
}

/*

 */

function before_main() {
    // init singleton
    new ConfigFile();

    // init class
    ReflectionFactory.addClass(Babel);
    ReflectionFactory.addClass(Nodemon);
    ReflectionFactory.addClass(Deployer);
}

function main() {
    logger.debug(`${__dirname}`);

    let parser = new Parser();
    let parseRes = parser.grammarList();

    let generator = new Generator(parseRes);
    generator.generate();

    logger.info('the end of the programme');
}

