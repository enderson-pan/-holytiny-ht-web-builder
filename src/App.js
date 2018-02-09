import Generator from "./Generator";
import Parser from "./Parser";
import ReflectionFactory from "./ReflectionFactory";
import Babel from "./Transpiler/Babel/Babel";
import Deployer from "./Deployer/Deployer";
import Nodemon from "./Executor/Nodemon/Nodemon";
import ConfigFile from "./ConfigFile";
import PackageJson from './PackageJson';

import program from 'caporal';
import logger from 'winston';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import FilePath from "./FilePath";

let instance = null;
export default class App {
    constructor () {
        // singleton
        if (instance) {
            return instance;
        }
        instance = this;

        // init command line interface
        this.initCmdInterface();

        // init singleton object
        App.initSingleton();
        // add class meta to reflection factory.
        App.initClass();


        // init all objects needed.
        this.parser_ = new Parser();
        const parseRes_ = this.parser_.grammarList();
        this.generator_ = new Generator(parseRes_);
    }

    static initSingleton() {
        //new ConfigFile();
    }

    static initClass () {
        ReflectionFactory.addClass(Babel);
        ReflectionFactory.addClass(Nodemon);
        ReflectionFactory.addClass(Deployer);
    }

    initCmdInterface () {
        clear();
        // hello message
        console.log(
            chalk.yellow(
                figlet.textSync('htwb', { horizontalLayout: 'full' })
            )
        );
        const self = this;
        const filePath = new FilePath();
        const projectPackageJson = new PackageJson(filePath.packageJsonPath()).content();
        const version = projectPackageJson['version'];
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
            .command('backend', 'Generate back end building npm scripts.')
            .alias('b')
            .action(() => {
                self.generateBackend();
            });

        program.parse(process.argv);

        /*if(!program.args.length) {
            program.help();
        } else {
            logger.info('Keywords: ' + program.args);
        }*/
    }

    createProject () {
        logger.debug('Create empty project!');
        logger.debug(`${__dirname}`);
        logger.debug(`${process.env.PWD}`);
    }

    generateBackend () {
        logger.debug('Generate back end npm scripts!');
    }

    run () {
        this.generator_.generate();
    }
}
