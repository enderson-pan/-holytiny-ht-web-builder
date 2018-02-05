import logger from 'winston';

import Transpiler from "../Transpiler";

export default class Babel extends Transpiler {
    constructor () {
        super();

        logger.debug('Bable created!');
    }
}
