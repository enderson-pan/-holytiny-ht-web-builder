import logger from 'winston';

import Executor from '../Executor';

export default class Nodemon extends Executor {
    constructor (content, nextContent) {
        super(content, nextContent);

        logger.debug(`Nodemon created, content is: ${JSON.stringify(this.content())}`);
        logger.debug(`Nodemon created, next content is: ${JSON.stringify(this.nextContent())}`);
    }
}
