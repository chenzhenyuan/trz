# `@trz/serialize`

> 一个简单的JavaScript字符串序列化操作工具。

## 使用说明

### 导入

使用JavaScript的方式导入库方法：

```js
const Serialize = require('@trz/serialize');
// do something yourself
```

使用 ES6 import 语法导入：

```ts
import Serialize from '@trz/serialize';
// do something yourself
```

### API

1. .get(name: strin): any
   - *获取序列指定键名的值，如果存在多个键值对，那么只会返回第一个（获取所有值，需要使用 `Serialize.getAll()`）。*
   - 演示代码：

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      console.log(serialize.get('a'))     // => 1
      console.log(serialize.get('b'))     // => 2
      ```

2. .getAll(name: string): any[]
   - *获取序列指定键名的所有值。*
   - 代码演示：

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      console.log(serialize.getAll('b'))  // => [2, "B"]
      ```

3. .append(name: string, value: any): void
   - *添加一个指定的键/值对作为新的序列。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      
      serialize.append("x", "666");
      console.log(serialize.toString())  // => a=1&b=2&c=3&d=4&b=B&a=666
      
      serialize.append("a", "666");
      console.log(serialize.toString())  // => a=1&b=2&c=3&d=4&b=B&a=666
      ```

4. .set(name: string, value: any): void
   - *将与给定序列键名相关的值设置为给定值。如果有多个值，则删除其他值。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      
      serialize.set("a", "666");
      console.log(serialize.toString())  // => a=666&b=2&c=3&d=4&b=B
      
      serialize.set("z", "777");
      console.log(serialize.toString())  // => a=666&b=2&c=3&d=4&b=B&z=777
      ```

5. .delete(name1: string, ...): void
   - *从所有序列中删除给定的键及其相关值。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      
      serialize.delete("a", "b");
      console.log(serialize.toString())  // => c=3&d=4
      ```

6. .has(name: string): boolean
   - *返回一个布尔值，表明是否存在这样的序列键名。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      
      console.log(serialize.has('a'))  // => true
      console.log(serialize.has('x'))  // => false
      ```

7. .keys(): string\[\]
   - *返回序列中的键的列表。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      console.log(serialize.keys())  // => ["a", "b", "c", "d", "b"]
      ```

8. .values(): any\[\]
   - *返回序列中的值的列表。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      console.log(serialize.values())  // => ["1", "2", "3", "4", "B"]
      ```

9. .toString(): string
   - *返回一个包含序列字符串的字符串，适合在URL中使用。不包括问号。*
   - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      
      console.log('' + serialize.toString());    // => a=1&b=2&b=B&c=3&d=4
      ```

10. .stringify(): string
    - *返回一个包含序列字符串的字符串，适合在URL中使用。不包括问号。*
    - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      
      console.log('' + serialize.stringify());    // => a=1&b=2&b=B&c=3&d=4
      ```

11. .sort(): Serialize
    - 将序列的键按字母表的顺序进行排序
    - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('d=4&a=1&b=2&c=3&b=B');
      serialize.sort();
      console.log('' + serialize);    // => a=1&b=2&b=B&c=3&d=4
      ```

12. .forEach(callback: (name: string, value: number, parent: Serialize) => void,  thisArg?: any): void
    - 遍历所有的序列键值对
    - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');

      serialize.forEach((name, value) => {
        console.log('name:', name, 'value:', value);
      });
      /*
        name: a value: 1
        name: b value: 2
        name: c value: 3
        name: d value: 4
        name: b value: B
       */
      ```

13. .entries(): IterableIterator<[string, any]
    - 迭代器
    - 代码演示:

      ```ts
      import Serialize from '@trz/serialize';
      const serialize = new Serialize('a=1&b=2&c=3&d=4&b=B');
      ```
