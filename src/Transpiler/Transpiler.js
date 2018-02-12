import {TaskTool} from '../CommandLineTool';

export default class Transpiler extends TaskTool {
    constructor (content, nextContent) {
        super(content, nextContent);
    }
}
