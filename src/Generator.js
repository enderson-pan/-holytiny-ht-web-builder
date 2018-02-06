import ReflectionFactory from './ReflectionFactory';

export default class Generator {
    constructor (grammarList) {
        const self = this;

        self.commandLineTools = [];

        for (let iter = grammarList.header.list.child; iter !== null; iter = iter.list.child) {
            const cmdLineTool = ReflectionFactory.create(iter.className, iter.content);
            self.commandLineTools.push(cmdLineTool);
        }
    }
}
