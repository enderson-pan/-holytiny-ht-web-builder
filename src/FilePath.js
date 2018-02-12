import path from 'path';

const PACKAGE_JSON_PATH = './package.json';

const CONFIG_FILE_PATH = './htwb.json';
const RAW_CONFIG_FILE_PATH = './data/htwb.json';

const NPMIGNORE_FILE_PATH = './.npmignore';
const RAW_NPMIGNORE_FILE_PATH = './data/.npmignore';

let instance = null;
export default class FilePath {
    constructor () {
        if (!instance) {
            instance = this;
        } else {
            return instance;
        }

        const self = this;

        self.projectPath_ = path.join(__dirname, '../');
        self.pwd_ = path.join(process.env.PWD, );

        self.packageJsonPath_ = path.join(self.projectPath_, PACKAGE_JSON_PATH);

        self.pwdPackageJsonPath_ = path.join(self.pwd_, PACKAGE_JSON_PATH);

        self.configFilePath_ = path.join(self.projectPath_, CONFIG_FILE_PATH);
        self.rawConfigFilePath_ = path.join(self.projectPath_, RAW_CONFIG_FILE_PATH);

        self.npmignoreFilePath_ = path.join(self.projectPath_, NPMIGNORE_FILE_PATH);
        self.rawNpmignoreFilePath_ = path.join(self.projectPath_, RAW_NPMIGNORE_FILE_PATH);
    }

    projectPath () {
        return this.projectPath_;
    }

    pwdPath() {
        return this.pwd_;
    }

    packageJsonPath () {
        return this.packageJsonPath_;
    }

    workingPackageJsonPath () {
        return this.pwdPackageJsonPath_;
    }

    configFilePath () {
        return this.configFilePath_;
    }
    rawConfigFilePath () {
        return this.rawConfigFilePath_;
    }

    npmignoreFilePath () {
        return this.npmignoreFilePath_;
    }
    rawNpmignoreFilePath() {
        return this.rawNpmignoreFilePath_;
    }


}
