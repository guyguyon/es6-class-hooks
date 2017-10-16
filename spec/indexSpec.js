const classHooks = require('../index');


class Test {
    constructor() {
        this.someVar = 33;
    }

    foo(a, b) {
        return a + b;
    }

    goo(a, b) {
        return a - b;
    }

    doo(a, b) {
       return this.foo(a, b); 
    }
}

describe('tests', () => {
    it('wrap hook', () => {
        function wrapHook(instance, func, args) { 
            return func.call(this, ...args) * 2; 
        }

        const TestWithHooks = classHooks(Test, wrapHook);

        const test = new Test();
        const testWithHooks = new TestWithHooks();

        const args = [3, 4];

        expect(test.foo(...args) * 2).toEqual(testWithHooks.foo(...args));
    });

    it('call function from another function', () => {
        function wrapHook(instance, func, args) { 
            return func.call(this, ...args) * 2; 
        }

        const TestWithHooks = classHooks(Test, wrapHook);
        const testWithHooks = new TestWithHooks();

        const args = [3, 4];

        expect(testWithHooks.doo(...args)).toEqual(testWithHooks.foo(...args) * 2);
    });

    it('access instance variable from the wrap function', () => {
        function wrapHook(instance, func, args) { 
            return instance.someVar;
        }

        const TestWithHooks = classHooks(Test, wrapHook);
        const testWithHooks = new TestWithHooks();
        const args = [3, 4];

        expect(testWithHooks.foo(...args)).toEqual(33);
    });

    it('whitelist functions', () => {
        function wrapHook(instance, func, args) { 
            return func.call(this, ...args) * 2; 
        }

        const TestWithHooks = classHooks(Test, wrapHook, ['foo']);

        const test = new Test();
        const testWithHooks = new TestWithHooks();

        const args = [3,4];

        expect(test.foo(...args) * 2).toEqual(testWithHooks.foo(...args));
        expect(test.goo(...args)).toEqual(testWithHooks.goo(...args));
    });
});