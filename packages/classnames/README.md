# `@trz/classnames`

> A tool for conditionally linking classNames together.

## Install

```zsh
npm install @trz/classnames

# Or

yarn add @trz/classnames
```

## Usage

### Import

```js
// ES6
import classnames from '@trz/classnames';

// nodejs or broswerES5
const classnames  = require('@trz/classnames');
```

### Interface

---

#### `(classname1: string, classname2: string, ...) => string;`

* description:
  > Pass in an unlimited number of arguments of string type. All incoming parameters will be combined into a string, separated by a space.
  >
  > If there are duplicate values in the incoming string, only the first incoming value will be retained in the order it was passed.

* example:

  ```ts
  import classnames from '@trz/classnames';
  
  const result = classnames("cn1", "cn2", "cn3");
  
  console.log(result); //>>> 'cn1 cn2 cn3'
  ```

---

#### `(classname1: {[key: string]: boolean}, classname2: {[key: string]: boolean}, ...) => string`

* description:
  > When the Value of the object is true, the Key of the object will be recognized as a reserved value, and the tool will merge the compliant Key into a string, which is separated by a space.
  >
  > The keys of the objects are traversed and the keys with value true are merged into a string. If there are duplicate values in the string, only the first value passed in will be kept in the order it was passed.

* example:

  ```js
  import classnames from '@trz/classnames';
  
  const result1 = classnames({ cn1: true }, { cn2: true }, { cn3: true });
  console.log(result1); //>>> 'cn1 cn2 cn3'
  
  
  const result1 = classnames({ cn1: true }, { cn2: false }, { cn3: true });
  console.log(result1); //>>> 'cn1 cn3'
  

  const result1 = classnames({ cn1: true, cn2: true }, { cn3: true });
  console.log(result1); //>>> 'cn1 cn2 cn3'
  
  
  const result1 = classnames({ cn1: true, cn2: true }, { cn3: true, cn2: true });
  console.log(result1); //>>> 'cn1 cn2 cn3'
  ```
  
---

#### `(classname1: Array<string | {[key: string]>, classname2: Array<string | {[key: string]>, ...) => string`

* description:
  > pass an indeterminate number of parameters, the format of the parameters for the array, the type of the array elements can be any of the types specified above in the document, or a combination of both. Also in the case of duplication, again, only the first occurrence of classname is retained.

* example:

  ```js
  import classnames from '@trz/classnames';
  
  const result1 = classnames(['cls1', { cls2: true }, { cls2: true }, { cls3: true }]);
  console.log(result1); //>>> 'cls1 cls2 cls3'
  ```

---

#### `(classname1: string, classname2: {[key: string]: boolean}, ...) => string`

* description:
  > Pass in an indeterminate number of arguments, which can be of any of the types specified in the above document, or a combination of both. Also, in case of duplication, only the first occurrence of classname is retained.

* example:

  ```js
  import classnames from '@trz/classnames';
  
  const result = classnames("cn1", { cn2: true }, { cn3: true }， 'cn4'， ["cn5", , { cn6: false }, { cn7: true }， ["cn8", , { cn9: true, cn2: false }]]);
  
  console.log(result); //>>> 'cn1 cn2 cn3 cn4 cn5 cn7 cn8 cn9'
  ```
  