function classHooks(classObject, wrap, whiteList) {
    const classHandler = {
        construct: function (target, argumentsList, newTarget) {

            const instanceHandler = {
                get: (target, property) => {

                    const functionWrapper = function(...args) {
                        return wrap(target[property], args);
                    };

                    return !whiteList || (whiteList && whiteList.includes(property)) ?
                        functionWrapper :
                        target[property];
                }
            };

            const instance = new target(argumentsList);
            return new Proxy(instance, instanceHandler);
        }
    };

    return new Proxy(classObject, classHandler);
}

module.exports = classHooks;