import logger from 'winston';

import Transpiler from '../Transpiler';

export default class Babel extends Transpiler {
    constructor (content, nextContent) {
        super(content, nextContent);

        logger.debug(`Babel created, content is: ${JSON.stringify(this.content())}`);
        logger.debug(`Babel created, next content is: ${JSON.stringify(this.nextContent())}`);
        logger.debug(`And is windows? ${this.isWindows()}`);
    }
}
