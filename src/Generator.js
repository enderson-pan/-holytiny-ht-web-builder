import ReflectionFactory from './ReflectionFactory';

export default class Generator {
    constructor (grammarList) {
        const self = this;

        self.grammarList_ = grammarList;

        self.commandLineTools = [];

        for (let iter = grammarList.header.list.child; iter !== null; iter = iter.list.child) {
            let cmdLineTool;
            if (iter.list.child) {
                cmdLineTool = ReflectionFactory.create(iter.className, iter.content, iter.list.child.content);
            } else {
                cmdLineTool = ReflectionFactory.create(iter.className, iter.content, null);
            }
            self.commandLineTools.push(cmdLineTool);
        }
    }

    generate (scriptSection) {
        for (const tool of this.commandLineTools) {
            tool.generate(scriptSection);
        }
    }
}
