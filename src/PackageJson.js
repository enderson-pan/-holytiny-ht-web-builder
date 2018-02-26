import fs from 'fs';

import winston from 'winston';

export default class PackageJson {
    constructor (packageJsonPath) {
        //console.log('packageJsonPath: ' + packageJsonPath);
        if ( !fs.existsSync(packageJsonPath) ) {
            throw new Error('Cannot find package.js file!');
        }

        this.packageJsonPath_ = packageJsonPath;

        const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
        winston.debug(`PackageJson constructor(): fileContent ${fileContent}`);

        try {
            this.content_ = JSON.parse(fileContent);
        } catch (e) {
            throw e;
        }

        winston.debug(`PackageJson constructor(): this.content_ ${this.content_}`);
    }

    content () {
        return this.content_;
    }

    path () {
        return this.packageJsonPath_;
    }

    writeScriptsToPackageJsonFile (scriptSection) {
        this.content_['scripts'] = scriptSection;
        const contentString = JSON.stringify(this.content_, null, 4);

        fs.writeFileSync(this.packageJsonPath_, contentString);
    }

    isScriptExist () {
        const scripts = this.content_['scripts'];
        for (let property in scripts) {
            if (scripts.hasOwnProperty(property)) {
                if (/ht-/.test(property)) {
                    return true;
                }
            }
        }
        return false;
    }

    removeGeneratedScripts (logger) {
        logger.debug('PackageJson.removeGeneratedScripts()');
        let scripts = this.content_['scripts'];
        logger.debug(`PackageJson.removeGeneratedScripts() scripts: ${JSON.stringify(scripts, null, 4)}`);
        logger.debug(`PackageJson.removeGeneratedScripts() iterate scripts for ht- and delete it`);
        Object.keys(scripts).forEach( (key, index) => {
            if (/ht-/.test(key)) {
                logger.debug(`PackageJson.removeGeneratedScripts() scripts.${key}: ${scripts[key]}:`);
                delete scripts[key];
            }
        });
        logger.debug(`PackageJson.removeGeneratedScripts() after delete: ${JSON.stringify(scripts, null, 4)}`);

        this.writeScriptsToPackageJsonFile(scripts);
    }
}
