/*
Abstract class of command line tool to generate npm script.
 */

import fs from 'fs';
import path from 'path';
import logger from "winston/lib/winston";

class CommandLineTool {
    constructor () {
        const self = this;
        self.isWin_ = /^win/.test(process.platform);
        this.projectPath_ = path.join(__dirname, '../');
    }

    isWindows () {
        return this.isWin_;
    }

    getConcreteThis () {
        return this;
    }

    generate () {
        const  templateFileContent = this.templateFileContent();
        if (!templateFileContent) {
            throw new Error('Cannot get template content!');
        }
        const self = this.getConcreteThis();
        const functionBody = `return ${templateFileContent}`;
        const getTemplate = new Function('self', functionBody);
        // logger.debug('getTemplate: ', getTemplate(self));
        const generatedCmd = getTemplate(self);
        logger.debug('generatedCmd: ' + generatedCmd);
    }

    setClassTemplateFilePath (filePath) {
        this.templateFilePath_ = filePath;

        this.readTemplateFile();
    }

    readTemplateFile () {
        if (!fs.existsSync(this.templateFilePath_)) {
            throw new Error(`The class template file ${this.templateFilePath_} does not exist!`);
        }

        this.templateFileConent_ = fs.readFileSync(this.templateFilePath_, 'utf8');
    }

    templateFileContent () {
        return this.templateFileConent_;
    }

    projectPath () {
        return this.projectPath_;
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
