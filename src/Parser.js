import fs from 'fs';

import ConfigFile from './ConfigFile';

//const PARSE_NODES = ['transpiler', 'bundler', 'executor', 'deployer'];


export default class Parser {
    constructor () {
        const self = this;

        const theConfigFile = new ConfigFile();
        self.configFilePath = theConfigFile.configFilePath;
        self.parseResult = new LinkedList(); // Bidirectional list header.

        self.parseConfigFile();
    }

    parseConfigFile () {
        const self = this;

        const fileContent = self.getConfigFileContent();
        //let transpiler = ReflectionFactory.create( ((fileContent['transpiler'])['class'])['name'] );
        const transpilerNode = Parser.createNode(fileContent, 'transpiler');
        const bundlerNode = Parser.createNode(fileContent, 'bundler');
        const executorNode = Parser.createNode(fileContent, 'executor');
        const deployerNode = Parser.createNode(fileContent, 'deployer');

        // Assemble nodes.
        const nodes = [];
        nodes.push(transpilerNode);
        nodes.push(bundlerNode);
        nodes.push(executorNode);
        nodes.push(deployerNode);

        for (const node of nodes) {
            if (node) {
                this.parseResult.insertLast(node);
            }
        }
    }

    grammarList () {
        return this.parseResult;
    }

    getConfigFileContent () {
        const self = this;
        const rawData = fs.readFileSync(self.configFilePath);
        if (!rawData) {
            throw new Error('Cannot read htwb.json, please check it.');
        }

        return JSON.parse(rawData);
    }

    static createNode (configFileContent, nodeType) {
        const theNodeType = configFileContent[nodeType];
        if (!theNodeType) {
            throw new Error('createNode error! nodeType does not exit.');
        }

        if (!theNodeType['class']) {
            return null;
        }

        const nodeClass = theNodeType['class'];

        const className = (nodeClass['meta'])['name'];
        const classContent = nodeClass['content'];

        return new Node(className, classContent);
    }
}

class LinkedList {
    constructor () {
        this.header = new Node;

        this.lastNode = this.header;
    }

    insertLast (node) {
        this.lastNode.insertChild(node);
        this.lastNode = node;
    }

    /*insertFront (node) {
        node.list.child = this.header.list.child;
        this.header.child = node;
    }*/
}

class Node {
    constructor (className, classContent, nextClassContent) {
        const self = this;

        self.className = className;
        self.content = classContent;
        self.nextClassContent = nextClassContent;

        self.list = {};
        self.list.child = null;
    }

    insertChild (node) {
        const self = this;

        node.list.child = self.list.child;
        self.list.child = node;
    }
}
