/*
Abstract class of command line tool to generate npm script.
 */

export default class CommandLineTool {
    constructor () {
        const self = this;

        self.isWin = /^win/.test(process.platform);
    }

    isWindows () {
        const self = this;

        return self.isWin;
    }
}
