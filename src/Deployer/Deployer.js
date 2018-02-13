import {TaskTool} from '../CommandLineTool';

import winston from 'winston';

export default class Deployer extends TaskTool {
    constructor (content, nextContent) {
        super(content, nextContent);

        winston.debug(`Deployer created, content is: ${JSON.stringify(this.content())}`);
        winston.debug(`Deployer created, next content is: ${JSON.stringify(this.nextContent())}`);
    }

    generate () {
        // Do nothing.
    }
}
