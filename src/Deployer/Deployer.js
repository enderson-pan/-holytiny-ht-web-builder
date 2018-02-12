import {TaskTool} from '../CommandLineTool';
import {logger} from "../index";

export default class Deployer extends TaskTool {
    constructor (content, nextContent) {
        super(content, nextContent);

        logger.debug(`Deployer created, content is: ${JSON.stringify(this.content())}`);
        logger.debug(`Deployer created, next content is: ${JSON.stringify(this.nextContent())}`);
    }

    generate () {
        // Do nothing.
    }
}
