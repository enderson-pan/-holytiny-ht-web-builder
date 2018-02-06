/*
Abstract class of command line tool to generate npm script.
 */

class CommandLineTool {
    constructor () {
        const self = this;
        self.isWin_ = /^win/.test(process.platform);
    }

    isWindows () {
        return this.isWin_;
    }
}

export class TaskTool extends CommandLineTool {
    constructor (content, nextContent) {
        super();

        const self = this;
        self.content_ = content;
        self.nextContent_ = nextContent;
    }

    content () {
        return this.content_;
    }

    nextContent () {
        return this.nextContent_;
    }
}
