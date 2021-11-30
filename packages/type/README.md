# `@trz/type`

> A tool for real type validate.

## Install

```zsh
npm install @trz/type

# Or

yarn add @trz/type
```

## Usage

### Import

```ts
// ES6
import ty, {of, is}from '@trz/type';

// nodejs or broswerES5
const ty  = require('@trz/type');
```

### Interface

#### `function of(source: any): string;`

* Enter an element of any type and return the real type for the element in JavaScript.

* Example:

  ```js
  import ty from '@trz/type';
  
  ty.of(123456789)              //>>> number
  
  ty.of('this is a string')     //>>> string
  
  ty.of([])                     //>>> array
  
  ty.of({})                     //>>> object
  ```

#### `function is(source: any, assert: string): boolean`

* Compare whether the type is the specified type.
  
* Example:

  ```js
  import ty from '@trz/type';

  ty.is([], 'array')              //>>> true

  ty.is([], 'object')             //>>> false

  ty.is('123456789', 'string')    //>>> true

  ty.is(null, 'string')           //>>> false
  ````

#### `function some(source: any, asserts: string[]): boolean`

* Verify that the specified element contains the specified type.
  
* Example:

  ```js
  import ty from '@trz/type';

  ty.some([1, 2], ['array', 'object'])      //>>> true
    
  ty.some([1, 2], ['object', 'string'])     //>>> false
    
  ty.some('1239', ['string'])               //>>> true
    
  ty.some(null, ['string'])                 //>>> false
  ````
