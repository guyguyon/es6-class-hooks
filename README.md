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
    foo(x) {
        console.log(`Executing foo with x=${x}`);
    }

    goo(y) {
        console.log(`Executing goo with y=${y}`);
    }
}

const wrapHook = (instance, func, args) => {
    console.log(`Calling ${func.name} with args: ${JSON.stringify(args)}`);
    const res = func(...args);
    console.log(`Called ${func.name} with args: ${JSON.stringify(args)}`);
    return res;
};


const TestWithHooks = classHooks(Test, wrapHook, ['foo']);

const testWithHooks = new TestWithHooks();

testWithHooks.foo(4);
console.log('============');
testWithHooks.goo(3);


//  Calling foo with args: [4]
//  Executing foo with x=4
//  Called foo with args: [4]
//  ============
//  Executing goo with y=3
```
