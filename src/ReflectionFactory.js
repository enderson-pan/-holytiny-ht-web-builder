import Babel from './Transpiler/Babel/Babel';
import Nodemon from './Executor/Nodemon/Nodemon';

const ReflectionFactory = {
    metaData: {
        Babel,
        Nodemon
    },
    create (name, ...args) {
        const self = this;
        let cls = self.metaData[name];
        if (!cls) {
            throw new Error('The class you try to create does not registered in metaData!');
        }
        return new cls(...args);
    }
};

export {ReflectionFactory as default};
