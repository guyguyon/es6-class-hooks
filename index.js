function classHooks(classObject, wrap, whiteList) {
    const classHandler = {
        construct: function (target, argumentsList, newTarget) {
            const instance = new target(...argumentsList);

            const instanceHandler = {
                get: (target, property, receiver) => {

                    const functionWrapper = function(...args) {
                        return wrap.call(receiver, instance, target[property], args);
                    };

                    return !whiteList || (whiteList && whiteList.includes(property)) ?
                        functionWrapper :
                        target[property];
                }
            };

            return new Proxy(instance, instanceHandler);
        }
    };

    return new Proxy(classObject, classHandler);
}

module.exports = classHooks;