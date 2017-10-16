# es6-class-hooks

Use classHooks to wrap any function in your class.

## Installation

```bash
$ npm install es6-class-hooks --save
```

## Quick Start

To wrap your function use `classHooks(classObject, wrapFunc, whitelist)`
The returned value will be your wrapped class. 

use `whitelist` parameter to whitelist which functions will be wrapped.

Usage example: 

```javascript 
const classHooks = require('es6-class-hooks');

class Test {
    constructor() {
        this.someVar = 'just an instance variable';
    }

    foo(x) {
        console.log(`Executing foo with x=${x}`);
    }

    goo(y) {
        console.log(`Executing goo with y=${y}`);
    }
}

function wrapHook(instance, func, args) {
    console.log(`Printing ${instance.someVar}`);
    console.log(`Calling ${func.name} with args: ${JSON.stringify(args)}`);
    const res = func.call(this, ...args);
    console.log(`Called ${func.name} with args: ${JSON.stringify(args)}`);
    return res;
}


const TestWithHooks = classHooks(Test, wrapHook, ['foo']);

const testWithHooks = new TestWithHooks();

testWithHooks.foo(4);
console.log('============');
testWithHooks.goo(3);

//  Printing just an instance variable
//  Calling foo with args: [4]
//  Executing foo with x=4
//  Called foo with args: [4]
//  ============
//  Executing goo with y=3
```

## Updates
v2.0.0 - using `receiver` to bind `this` currectly. It is *strongly* suggested to use regular function as wrapper and bind this to `func` instead of arrow function so `this` will pass to the function currectly. Look on the code sample for more information.
