
const ReflectionFactory = {
    metaData: {
    },
    create (name, ...args) {
        const self = ReflectionFactory;
        let cls = self.metaData[name];
        if (!cls) {
            throw new Error('The class you try to create does not registered in metaData!');
        }
        return new cls(...args);
    },
    addClass (cls) {
        ReflectionFactory.metaData[cls.name] = cls;
    }

};

export {ReflectionFactory as default};
