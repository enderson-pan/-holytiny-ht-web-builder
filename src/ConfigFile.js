import fs from 'fs';

import {logger} from "./index";
import FilePath from './FilePath';


let instance = null;

export default class ConfigFile {
    constructor () {
        /*
        1. If there's no package.json, exit.
        2. If there's no htwb.json, the config file of htwb, create one, and add
           htwb.json to .npmignore. If .npmignore doesn't exist, create one.
         */
        const self = this;

        if (!instance) {
            instance = self;
        } else {
            return instance;
        }

        self.commandLineTools = [];

        const filePath = new FilePath();

        self.packageJsonPath = filePath.packageJsonPath();

        self.configFilePath = filePath.configFilePath();
        self.rawConfigFilePath = filePath.rawConfigFilePath();

        self.npmignoreFilePath = filePath.npmignoreFilePath();
        self.rawNpmignoreFilePath = filePath.rawNpmignoreFilePath();

        self.init();
    }

    init() {
        const self = this;

        if (!fs.existsSync(self.packageJsonPath)) {
            throw new Error('There is no package.json file in the current path, ' +
                'please execute \'npm init\' or \'yarn init\' firstly.');
        }

        if (!fs.existsSync(self.configFilePath)) {
            logger.info('There is no htwb.json file, create one.');
            fs.copyFileSync(self.rawConfigFilePath, self.configFilePath);
        }

        if (!fs.existsSync(self.npmignoreFilePath)) {
            logger.info('There is no .npmignore file, create one.');
            fs.copyFileSync(self.rawNpmignoreFilePath, self.npmignoreFilePath);
        } else {
            logger.info('There is .npmignore file. Add htwb.json to it if it does not contain this item');
            let npmignoreContent = fs.readFileSync(self.npmignoreFilePath, 'utf8');
            if (!npmignoreContent) {
                throw new Error(`Cannot open ${self.npmignoreFilePath}`);
            }

            const index = npmignoreContent.indexOf('htwb.json');
            if (index === -1) {
                logger.info('Add htwb.json to .npmignore');
                fs.appendFileSync(self.npmignoreFilePath, 'htwb.json');
            }
        }
    }

    addCommandLineTool (commandLineTool) {
        const self = this;

        self.commandLineTools.push(commandLineTool);
    }
}
