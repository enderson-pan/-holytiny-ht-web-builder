import fs from 'fs';

import FilePath from './FilePath';

export default class PackageJson {
    constructor (packageJsonPath) {
        if ( !fs.existsSync(packageJsonPath) ) {
            throw new Error('Cannot find package.js file!');
        }

        const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
        this.content_ = JSON.parse(fileContent);
    }

    content () {
        return this.content_;
    }
}
