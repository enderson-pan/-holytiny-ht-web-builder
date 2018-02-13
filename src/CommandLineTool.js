/*
Abstract class of command line tool to generate npm script.
 */

import fs from 'fs';
import winston from 'winston';

class CommandLineTool {
    constructor () {
        const self = this;
        self.isWin_ = /^win/.test(process.platform);
    }

    isWindows () {
        return this.isWin_;
    }

    generate (scriptSection) {
        let  templateFileContent = this.templateFileContent();
        if (!templateFileContent) {
            throw new Error('Cannot get template content!');
        }
        const self = this;
        Object.keys(templateFileContent).forEach((key, index) => {
            let content = templateFileContent[key];
            content = content.replace(/\r?\n|\r/g, '');
            content = `\`${content}\``;
            const functionBody = `return ${content}`;
            const getTemplate = new Function('self', functionBody);
            const generatedCmd = getTemplate(self);
            winston.debug('CommandLineTool.generate() generatedCmd: ' + generatedCmd);
            scriptSection[key] = generatedCmd;
        });
    }

    setClassTemplateFilePath (filePath) {
        this.templateFilePath_ = filePath;

        this.readTemplateFile();
    }

    readTemplateFile () {
        if (!fs.existsSync(this.templateFilePath_)) {
            throw new Error(`The class template file ${this.templateFilePath_} does not exist!`);
        }
        const content = fs.readFileSync(this.templateFilePath_, 'utf8');
        this.templateFileContent_ = JSON.parse(content);
    }

    templateFileContent () {
        return this.templateFileContent_;
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
