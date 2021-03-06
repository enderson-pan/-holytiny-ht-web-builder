import path from 'path';
import winston from 'winston'
import Transpiler from '../Transpiler';
import FilePath from '../../FilePath';

const CLASS_CONFIG_FILE_PATH = './data/Transpiler/Babel/template.json';  // relative fo project path

export default class Babel extends Transpiler {
    constructor (content, nextContent) {

        if (!nextContent) {
            throw new Error('Cannot create Babel object, because no output dir!');
        }
        super(content, nextContent);

        // set template path to super and get the file content.
        this.setClassTemplateFilePath();

        winston.debug(`Babel created, content is: ${JSON.stringify(this.content())}`);
        winston.debug(`Babel created, next content is: ${JSON.stringify(this.nextContent())}`);
        winston.debug(`And is windows? ${this.isWindows()}`);

        this.cmdName_ = 'Babel';
        this.sourceDir_ = (content['sourceDir_'])[0];
        this.destDir_ = (nextContent['sourceDir_'])[0];
        this.userOptions_ = (content)['userOptions_'];
    }

    setClassTemplateFilePath () {
        const filePath = new FilePath();
        const projectPath = filePath.projectPath();
        const templateFilePath = path.join(projectPath, CLASS_CONFIG_FILE_PATH);

        // decorate design pattern.
        super.setClassTemplateFilePath(templateFilePath);
    }
}
