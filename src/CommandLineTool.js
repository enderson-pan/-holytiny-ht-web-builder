/*
Abstract class of command line tool to generate npm script.
 */

export class CommandLineTool {
    constructor () {
        const self = this;

        self.isWin = /^win/.test(process.platform);

        self.ENDS = {
            bothEnds: 'both-ends',
            frontEnd: 'front-end',
            backEnd: 'back-end'
        };
    }

    isWin () {
        const self = this;

        return self.isWin;
    }

    whichEnd () {
        return this.ENDS.bothEnds;
    }
}

export class FrontEnd extends CommandLineTool {
    whichEnd () {
        return super.ENDS.frontEnd;
    }
}

export class BackEnd extends CommandLineTool {
    whichEnd () {
        return super.ENDS.backEnd;
    }
}
