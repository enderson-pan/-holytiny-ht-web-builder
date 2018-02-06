import logger from 'winston';

import Executor from '../Executor';

export default class Nodemon extends Executor {
    constructor (content) {
        super();
        this.content = content;

        logger.debug(`Nodemon created, content is: ${JSON.stringify(this.content)}`);
    }
}

