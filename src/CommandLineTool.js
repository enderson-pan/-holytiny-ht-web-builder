/*
Abstract class of command line tool to generate npm script.
 */

export const CommandLineToolConst = {
    ENDS: {
        bothEnds: 'both-ends',
        frontEnd: 'front-end',
        backEnd: 'back-end'
    }
};

export class CommandLineTool {
    constructor () {
        const self = this;

        self.isWin = /^win/.test(process.platform);
    }

    isWindows () {
        const self = this;

        return self.isWin;
    }

    whichEnd () {
        return CommandLineToolConst.ENDS.bothEnds;
    }
}

export class FrontEnd extends CommandLineTool {
    whichEnd () {
        return CommandLineToolConst.ENDS.frontEnd;
    }
}

export class BackEnd extends CommandLineTool {
    whichEnd () {
        return CommandLineToolConst.ENDS.backEnd;
    }
}
