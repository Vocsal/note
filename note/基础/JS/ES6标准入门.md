# ES6标准入门

> ES6指JavaScript语言的下一个版本，ECMAScript版本发布是每年的6月份。
> Babel是ES6转码器，可将ES6代码转为ES5代码。

- ES6增加了`let`和`const`命令
对变量的声明增加了作用域的概念
全局作用域、函数作用域和块级作用域
`var`变量声明存在变量提升，而`let`与`const`不存在变量提升
在不同作用域使用`let`声明相同名称的变量，这两个变量不相同，即使作用域存在父子关系
`let`和`const`不允许重复声明变量
`const`声明只读变量，声明后不能更改变量的值
`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了
ES5 2种变量声明方式：`var`, `function`
ES6 新增4种变量声明方式：`let`, `const`, `import`, `class`

- 变量的解构赋值
解构：从数组或对象中对变量进行赋值
在数组或对象中，可通过对应关系进行变量赋值
数组解构如下：
```javascript
let [a, b, c] = [1, 2, 3];
let [a, b, c] = [1, 2, 3, 4];
let [a, [[b], c]] = [1, [[2], 3]];
let [a, [[b], c]] = [1, [[2], 3], 4];
let [a, , c] = [1, 2, 3];
let [ , , c] = [1, 2, 3];
// a = 1, b = 2, c = 3
let [...a] = [1, 2, 3]; // a = [1, 2, 3]
let [a, b, ...c] = [1, 2, 3]; // a = 1, b = 2, c = [3]
let [a, b, c] = [1, 2]; // a = 1, b = 2, c = undefined
let [a, b, ...c] = [1]; // a = 1, b = undefined, c = []
```
解构不成功会报错，如`let [a, b] = 1;`
只要数据解构具有Iterator接口，可采用数组形式解构赋值
```javascript
let [a, b, c] = new Set([1, 2, 3]);
function* demo() {
    let i = 1;
    while (i <= 3) {
        yield i;
        i++;
    }
}
let [a, b, c] = demo();
// a = 1, b = 2, c = 3
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

字符串解构如下：
```javascript
const [a, b, c] = "123";
// a = "1", b = "2", c = "3"
const {length} = "123"
// length = 3
```

对象解构如下：
```javascript
let {a} = {a: 1};
let {a: a} = {a: 1};
let {a, b, c} = {a: 1, b: 2, c: 3};
let {a, b, c} = {a: 1, b: 2, c: 3, d: 4};
let {a, d: b, c} = {a: 1, d: 2, c: 3};
let {a, d: {e: [b]}, f: {c}} = {a: 1, d: {e: [2, 4]}, f: {c: 3}};
// a = 1, b = 2, c = 3
let [a, b] = [{}, []];
({d: a.prop, e: b[0]} = {d: 123, e: true});
// a = {prop: 123}, b = [true]
```

解构设置默认值
当解构的值为`undefined`(强相等)时，会被赋值为默认值
```javascript
// 数组
let [a = 1, b = 2, c = 3] = [1];
let [a = 1, b = 2, c = 3] = [1, undefined, 3];
// a = 1, b = 2, c = 3
let [a = 1, b = 2, c = 3] = [1, null, 4]; // a= 1, b = null, c = 4
let [a = 1, b = a] = []; // a = 1, b = 1
let [a = 1, b = a] = [2]; // a = 2, b = 2
let [a = 1, b = a] = [1, 2]; // a = 1, b = 2
let [a = b, b = 1] = []; // 报错
// 对象
let {a, b = 2, c} = {a: 1, c: 3};
let {a = 1, b = 2, c = 3} = {};
let {a, b = 2, c = 4} = {a: 1, c: 3};
let {a = 1, b = 2, c = 4} = {a: undefined, c: 3};
// a = 1, b = 2, c = 3
let arr = [1, 2, 3]
let {0: first, [arr.length - 1]: last} = arr;
// first = 1, last = 3
```
如果设置的默认值是一个表达式，则会惰性求值，即在需要时进行
```javascript
function func() {
    console.log("default");
    return 2;
}
let [a = func()] = [1];
// a = 1
let [b = func()] = [];
// b = 2
// default
```
函数参数也能够解构
```javascript
function add([a, b]) {
    return a + b;
}
function move({x = 0, y = 0} = {x: 0, y: 0}) {}
```

- 字符串拓展
模板字符串
```javascript
let s = "string"
console.log(`The s is ${s}.`);
// The s is string.
```

- 字符串新增方法
`String.fromCodePoint()`
`String.raw()`
`CodePointAt()`
`normalize()`
`indecludes()`, `startsWith()`, `endsWith()`
`repeat()`
`padStart()`, `padEnd()`
`trimStart()`, `trimEnd()`
`matchAll()`
`replaceAll()`

- 正则拓展

- 数值拓展
提供二级制与八进制写法，二进制0b或0B，八进制0o或0O
Number
`Number.isFinite()`, `Number.isNaN()`
`Number.parseInt()`, `Number.parseFloat()`
`Number.isInteger()`
`Number.ESPILON`
`Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER`, `Number.isSafeInteger()`
Math
`Math.trunc()`
`Math.sign()`
`Math.cbrt()`
`Math.clz32()`, `Math.imul()`, `Math.fround()`
`Math.hypot()`
`Math.expm1()`, `Math.log1p()`, `Math.lo10()`, `Math.log2()`
`**`
BigInt数据类型

- 函数拓展
对函数参数设置默认值，惰性求值
可用`...`设置不定个数参数
函数`length`属性，返回没有制定默认值参数的个数
函数`name`属性，返回该函数的名称
箭头函数 `() => {}`, `this`指向问题，不可用作构造函数，不可使用`arguments`对象，不可使用`yield`命令

- 数组扩展
扩展运算符`...`
```javascript
const [a, ...b] = [1, 2, 3];
// a = 1, b = [2, 3]
const { a, c, ...b } = {a: 1, b: 2, c: 3, d: 4}
// a = 1, b = {b: 2, d: 4}, c = 3
```
解构字符串或者具有Iterator接口的对象
`Array.from()` 将类数组对象或可遍历(iterable)对象转为数组
`Array.of()` 将参数转为数组
`copyWithin()`
`find()`, `findIndex()`
`fill()`
`entries()`, `keys()`, `values()`
`includes()`
`flat()`, `flatMap()`

- 对象拓展
属性名简写
```javascript
const a = 1;
const b = {a};
// 等同于
const b = {a: a};
// b = {a: 1}

const a = {
    func() {},
}
// 等价于
const a = {
    func: function() {},
}
```
属性名表达式
```javascript
const name = "prop";
const obj = {
    [name]: "value",
    ["a"+"b"]: "1+2",
}
```
属性名表达式不能简写
对象的方法函数也具有`name`属性
对象属性的描述`value`, `writable`, `enumerable`, `configurable`
属性的遍历`for...in`, `Object.keys`, `Object.getOwnPropertyNames`, `Object.getOwnPropertySymbols`, `Reflect.ownKeys`
`this`指向函数所在的对象，`super`指向当前对象的原型对象，两者在对象中都只能用于函数方法中
`Object.setProtoypeOf(obj, proto)`设置对象的原型
对象的扩展运算符`...`
```javascript
const a = {b: 2, c: 3};
const d = { ...a, e: 4};
// d = {b: 2, c: 3, e: 4}
```
链判断运算符`?.`
Null判断运算符`??`

- 对象新增方法
`Object.is()`
`Object.assign()`
`Object.getOwnPropertyDescriptors()`
`__proto__`, `Object.setProtoypeOf()`, `Object,getPrototypeOf()`
`Object.keys()`, `Object.values()`, `Object.entries()`
`Object.fromEntries()`

- Symbol
一种新的数据类型，表示独一无二的值
Symbol值由`Symbol`函数生成
```javascript
const s1 = Symbol();
const s2 = Symbol();
s1 === s2 // false
const s3 = Symbol("abc");
const s4 = Symbol("abc");
s3 === s4 // false
```
作为标识符，用于对象属性名
Symbol值用作对象属性名时，不能使用点运算符
通过`Object.getOwnPropertySymbols()`方法获取对象的Symbol值属性
`Reflect.ownKeys()`方法可以返回所有类型的键名
`Symbol.for()`, `Symbol.keyFor()`

- Set 和 Map 数据结构
Set
类似数组，成员的值是唯一的，通过`Set`函数构造
`size`, `add()`, `delete()`, `has()`, `clear()`
`keys()`, `values()`, `entries()`, `forEach()`
Map
类似对象，键值对组合，各类型的值都可作为键，通过`Map`函数构造
`size`, `set()`, `get()`, `delete()`, `has()`, `clear()`
`keys()`, `values()`, `entries()`, `forEach()`
Map与数组、对象和JSON互转

- Proxy
代理器，代理目标对象访问，修改相应规则
通过Proxy构造函数生成实例
```javascript
let proxy = new Proxy(target, handler)
let obj = new Proxy({}, {
    get: function(target, prop) {
        if(Object.prototype.hasOwnProperty.call(target, prop)) return target[prop];
        else {
            console.log(`${prop} is not exist.`);
        }
    }
})
obj.x
// x is not exist.
obj.x = 1;
obj.x
// 1
```
Proxy代理的操作如下：
1. `get(target, prop, receiver)` 代理对象属性的读操作
2. `set(target, prop, value, receiver)` 代理对象属性的写操作
3. `has(target, prop)` 代理`prop in proxy`操作，返回布尔值
4. `deleteProperty(target, prop)` 代理`delete target[prop]`操作，返回布尔值
5. `ownKeys(target)` 代理`Object.getOwnPropertyNames(proxy)`,`Object.getOwnPropertySymbols(proxy)`, `Object.keys(proxy)`, `for...in`操作，返回一个数组
6. `getOwnPropertyDescriptor(target, prop)` 代理`Object.getOwnPropertyDescriptor(proxy, prop)`, 返回属性的描述对象
7. `defineProperty(target, prop, desc)` 代理`Object.defineProperty(proxy, prop, desc)`, `Object.defineProperties(proxy, descs)`, 返回一个布尔值
8. `preventExtensions(target)` 代理`Object.preventExtensions(proxy)`, 返回一个布尔值
9. `getPrototypeOf(target)` 代理`Object.getPrototypeOf(proxy)`, 返回一个对象
10. `isExtensible(target)` 代理`Object.isExtensible(proxy)`, 返回一个布尔值
11. `setPrototypeOf(target, proto)` 代理`Obejct.setPrototypeOf(proxy, proto)`, 返回一个布尔值
12. `apply(target, object, args)` 代理Proxy实例作为函数调用的操作，`proxy(...args)`, `proxy.call(object, ...args)`, `proxy.apply(...)`
13. `contruct(target, args)` 代理Proxy实例作为构造函数调用的操作，`new proxy(...args)`

`Proxy.revocable()`方法返回一个可取消的Proxy实例
在Proxy代理的情况下，目标对象内部的`this`关键字指向Proxy代理

- Reflect
一个新的API
将`Object`对象上属于语言内部的方法，集成到`reflect`上
修改某些`Object`方法的返回结果
让`Object`的操作都变成函数行为
让`Reflect`对象的方法与`Proxy`对象的方法一一对应
`Reflect`对象的静态方法：
1. `Reflect.apply(target, thisArg, args)`
2. `Reflect.construct(target, args)`
3. `Reflect.get(target, prop, receiver)`
4. `Reflect.set(target, prop, value, receiver)`
5. `Reflect.defineProperty(target, prop, desc)`
6. `Reflect.deleteProperty(target, prop)`
7. `Reflect.has(target, prop)`
8. `Reflect.pwnKeys(target)`
9. `Reflect.isExtensible(target)`
10. `Reflect.preventExtensions(target)`
11. `Reflect.getOwnPropertyDescriptor(target, prop)`
12. `Reflect.getPrototypeOf(target)`
13. `Reflect.setPrototypeOf(target, prototype)`

- Promise对象
Promise是异步编程的一种解决方案
对象的状态不受外界影响
一旦对象状态改变，就不会再变，任何时候都可以得到这个结果
Promise对象由构造函数生成，构造函数的参数为一个函数，该函数的两个参数分别是`resolve`和`reject`，分别改变Promise对象不同的状态
`resolve`函数将Promise对象由“未完成”变为“成功”状态，在异步操作操作成功时调用，并将结果作为参数传递
`reject`函数将Promise对象由“未完成”变为“失败”状态，在异步操作操作失败时调用，并将结果作为参数传递
Promise对象的`then`方法接受`resolve`状态和`reject`状态的回调函数作为参数
`Promise.prototype.then()`
`Promise.prototype.catch()`
`Promise.prototype.finall()`
`Promise.all()`
`Promise.race()`
`Promise.allSettled()`
`Promise.any()`
`Promise.resolve()`
`Promise.reject()`
`Promise.try()`

- Iterator遍历
Iterator遍历器
为各种数据结构提供统一的访问接口，有顺序的进行遍历
用于`for...of`循环
遍历：创建一个遍历对象的Iterator接口，不断调用`next()`方法
`next()`方法返回一个对象，包含`value`和`done`两个属性
默认的Iterator接口部署在数据结构的`Symbol.iterator`属性
原生具有Iterator接口的数据解构如下：
`Array`, `Map`, `Set`, `String`, `TypedArray`, 函数的 `arguments` 对象, `NodeList` 对象
其中**字符串**也具有原生Iterator接口
调用Iterator接口：解构赋值、扩展运算符、`yield*`、`for...of`、`Array.from()`等


- Generator函数
ES6提供的一种异步编程解决方案
状态机




```javascript
```