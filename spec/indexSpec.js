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
}

describe('tests', () => {
    it('wrap hook', () => {
        const wrapHook = (instance, func, args) => { return func(...args) * 2; };

        const TestWithHooks = classHooks(Test, wrapHook);

        const test = new Test();
        const testWithHooks = new TestWithHooks();

        const args = [3, 4];

        expect(test.foo(...args) * 2).toEqual(testWithHooks.foo(...args));
    });

    it('access instance variable from the wrap function', () => {
        const wrapHook = (instance, func, args) => {
            return instance.someVar;
        };

        const TestWithHooks = classHooks(Test, wrapHook);
        const testWithHooks = new TestWithHooks();
        const args = [3, 4];

        expect(testWithHooks.foo(...args)).toEqual(33);
    });

    it('whitelist functions', () => {
        const wrapHook = (instance, func, args) => { return func(...args) * 2 };

        const TestWithHooks = classHooks(Test, wrapHook, ['foo']);

        const test = new Test();
        const testWithHooks = new TestWithHooks();

        const args = [3,4];

        expect(test.foo(...args) * 2).toEqual(testWithHooks.foo(...args));
        expect(test.goo(...args)).toEqual(testWithHooks.goo(...args));
    });
});