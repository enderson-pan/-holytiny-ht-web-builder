import Generator from "./Generator";
import Parser from "./Parser";
import ReflectionFactory from "./ReflectionFactory";
import Babel from "./Transpiler/Babel/Babel";
import Deployer from "./Deployer/Deployer";
import Nodemon from "./Executor/Nodemon/Nodemon";
import ConfigFile from "./ConfigFile";
import PackageJson from './PackageJson';
import FilePath from "./FilePath";

import program from 'caporal';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';


let instance = null;
export default class App {
    constructor () {
        // singleton
        if (instance) {
            return instance;
        }
        instance = this;

        // init singleton object
        App.initSingleton();
        // add class meta to reflection factory.
        App.initClass();
        // init all objects needed.
        this.parser_ = new Parser();
        const parseRes_ = this.parser_.grammarList();
        this.generator_ = new Generator(parseRes_);

        const filePath = new FilePath();
        this.projectPackageJson_ = new PackageJson(filePath.packageJsonPath()).content();
        this.pwdPackageJson_ = new PackageJson(filePath.workingPackageJsonPath()).content();
    }

    static initSingleton() {
        //new ConfigFile();
    }

    static initClass () {
        ReflectionFactory.addClass(Babel);
        ReflectionFactory.addClass(Nodemon);
        ReflectionFactory.addClass(Deployer);
    }

    run () {
        clear();
        // hello message
        console.log(
            chalk.yellow(
                figlet.textSync('htwb', { horizontalLayout: 'full' })
            )
        );
        const self = this;
        const version = self.projectPackageJson_['version'];
        program
            .version(version)
            .description('Generate npm scripts for automation.');

        program
            .command('project', 'Create an empty project.')
            .alias('p')
            .action(() => {
                self.createProject();
            });
        program
            .command('backend', 'Generate back end building npm scripts or command line building npm scripts.')
            .alias('b')
            .action((args, options, logger) => {
                self.generateBackend(args, options, logger);
            });

        program.parse(process.argv);
    }

    createProject (args, options, logger) {
        logger.info('Create empty project!');
        logger.info(`${__dirname}`);
        logger.info(`${process.env.PWD}`);
    }

    generateBackend (args, options, logger) {
        logger.info('Generate back end npm scripts...');
        /*logger.debug('args: ', args);
        logger.debug('options: ', options);*/
        let scriptSection = this.pwdPackageJson_['scripts'];
        logger.debug('scripts section in package.json: ', scriptSection);
        this.generator_.generate(scriptSection);
    }
}
