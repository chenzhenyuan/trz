# `@trz/classnames`

> 用于有条件地将classNames连接在一起的工具。

[English](./README.md)

## 安装

```zsh
npm install @trz/classnames

# 或者

yarn add @trz/classnames
```

## 使用

### 导入

```js
// ES5
import classnames from '@trz/classnames';

// nodejs or broswerES5
const classnames  = require('@trz/classnames');
```

### 接口

---

#### `(classname1: string, classname2: string, ...) => string;`

* 描述:
  > 传入不定个数的参数，参数为字符串类型。所有传入的参数将会被合并成字符串，该字符串以一个空格分隔。
  >
  > 如果传入的字符串中，存在重复的值，将会以传入的顺序仅保留最先传入的值。

* 例子:

  ```ts
  import classnames from '@trz/classnames';
  
  const result = classnames("cn1", "cn2", "cn3");
  
  console.log(result); //>>> 'cn1 cn2 cn3'
  ```

---

#### `(classname1: {[key: string]: boolean}, classname2: {[key: string]: boolean}, ...) => string`

* 描述:
  > 传入不定个数的参数，参数为K-V格式的对象，当对象的Value为true时，将会认定对象的Key为保留值，本工具则会将合规的Key合并成字符串，该字符串以一个空格分隔。
  >
  > 对象的key都会被遍历，并合并value为true的key到一个字符串，如果字符串存在重复的值，将会以传入的顺序仅保留最先传入的值。
  
* 例子:

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

* 描述:
  > 传入不定个数的参数，参数格式为数组，数组元素的类型可以是文档以上内容规定的任一类型，或两者的组合。同时在出现重复时，同样是仅保留首次出现的classname。
  
* 例子:

  ```js
  import classnames from '@trz/classnames';
  
  const result1 = classnames(['cls1', { cls2: true }, { cls2: true }, { cls3: true }]);
  console.log(result1); //>>> 'cls1 cls2 cls3'
  ```

---

#### `(classname1: string, classname2: {[key: string]: boolean}, ...) => string`

* 描述:
  > 传入不定个数的参数，参数可以是以上文档规定的任一类型，或两者的组合。同时在出现重复时，同样是仅保留首次出现的classname。
  
* 例子:

  ```js
  import classnames from '@trz/classnames';
  
  const result = classnames("cn1", { cn2: true }, { cn3: true }， 'cn4'， ["cn5", , { cn6: false }, { cn7: true }， ["cn8", , { cn9: true, cn2: false }]]);
  
  console.log(result); //>>> 'cn1 cn2 cn3 cn4 cn5 cn7 cn8 cn9'
  ```
  