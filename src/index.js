#!/usr/bin/env node

require('babel-polyfill');

import logger from 'winston';
import theConfigFile from './ConfigFile';

import BabelCli from './Babel/Babel';

import FeathersCli from './Feathers/Feathers';
import VueCli from './Vue/Vue';

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

    const babelCli = new BabelCli();
    const babelEnd = babelCli.whichEnd();
    logger.debug(`babelEnd is ${babelEnd}`);
    logger.debug('Is windows?' + babelCli.isWindows());

    const feathersCli = new FeathersCli();
    const feathersEnd = feathersCli.whichEnd();
    logger.debug(`feathersEnd is ${feathersEnd}`);

    const vueCli = new VueCli();
    const vueEnd = vueCli.whichEnd();
    logger.debug(`vueEnd is ${vueEnd}`);

    theConfigFile.addCommandLineTool(babelCli);
}

