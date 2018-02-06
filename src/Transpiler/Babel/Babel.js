import logger from 'winston';

import Transpiler from '../Transpiler';

export default class Babel extends Transpiler {
    constructor (content) {
        super();

        this.content = content;

        logger.debug(`Babel created, content is: ${JSON.stringify(this.content)}`);
        logger.debug(`And is windows? ${super.isWindows()}`);
    }
}
