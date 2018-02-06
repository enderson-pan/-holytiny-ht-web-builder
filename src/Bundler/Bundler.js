import {TaskTool} from '../CommandLineTool';

export default class Bundler extends TaskTool {
    constructor (content, nextContent) {
        super(content, nextContent);
    }
}
