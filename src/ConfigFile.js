import fs from 'fs';

const PACKAGE_JSON_PATH = '../package.json';

const CONFIG_FILE_PATH = '../.htwbrc';
const RAW_CONFIG_FILE_PATH = '../data/.htwbrc';

const NPMIGNORE_FILE_PATH = '../.npmignore';
const RAW_NPMIGNORE_FILE_PATH = '../data/.npmignore';

let instance = null;

export default class ConfigFile {
    constructor () {
        /*
        1. If there's no package.json, exit.
        2. If there's no .htwbrc, the config file of htwb, create one, and add
           .htwbrc to .npmignore. If .npmignore doesn't exist, create one.
         */
        const self = this;

        if (!instance) {
            instance = self;
        } else {
            return instance;
        }

        self.commandLineTools = [];

        self.packageJsonPath = __dirname + '/' + PACKAGE_JSON_PATH;

        self.configFilePath = __dirname + '/' + CONFIG_FILE_PATH;
        self.rawConfigFilePath = __dirname + '/' + RAW_CONFIG_FILE_PATH;

        self.npmignoreFilePath = __dirname + '/' + NPMIGNORE_FILE_PATH;
        self.rawNpmignoreFilePath = __dirname + '/' + RAW_NPMIGNORE_FILE_PATH;

        self.init();
    }

    init() {
        const self = this;

        if (!fs.existsSync(self.packageJsonPath)) {
            throw new Error('There is no package.json file in the current path, ' +
                'please execute \'npm init\' or \'yarn init\' firstly.');
        }

        if (!fs.existsSync(self.configFilePath)) {
            console.log('There is no .htwbrc file, create one.');
            fs.copyFileSync(self.rawConfigFilePath, self.configFilePath);
        }

        if (!fs.existsSync(self.npmignoreFilePath)) {
            console.log('There is no .npmignore file, create one.');
            fs.copyFileSync(self.rawNpmignoreFilePath, self.npmignoreFilePath);
        } else {
            console.log('There is .npmignore file. Add .htwbrc to it if it does not contain this item');
            let npmignoreContent = fs.readFileSync(self.npmignoreFilePath, 'utf8');
            if (!npmignoreContent) {
                throw new Error(`Cannot open ${self.npmignoreFilePath}`);
            }

            const index = npmignoreContent.indexOf('.htwbrc');
            if (index === -1) {
                console.log('Add .htwbrc to .npmignore');
                fs.appendFileSync(self.npmignoreFilePath, '.htwbrc');
            }
        }
    }

    addCommandLineTool (commandLineTool) {
        const self = this;

        self.commandLineTools.push(commandLineTool);
    }
}
