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
import type, {of, is}from '@trz/type';

// nodejs or broswerES5
const type  = require('@trz/type');
```

### Interface

#### `function of(source: any): string;`

* description:
  Enter an element of any type and return the real type of the element in JavaScript.

* example:

  ```js
  import type from '@trz/type';
  
  type.of(123456789)              //>>> number
  
  type.of('this is a string')     //>>> string
  
  type.of([])                     //>>> array
  
  type.of({})                     //>>> object
  ```

#### `function is(source: any, type_name: string): boolean`

* description:
  Verify that the incoming element is of the specified type.
  
* example:

```js
import type from '@trz/type';

type.is([], 'array')              //>>> true

type.is({}, 'array')              //>>> false

type.is('123456789', 'string')    //>>> true

type.is(null, 'string')           //>>> false
````
