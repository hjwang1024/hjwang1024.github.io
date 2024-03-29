## 作用域

- `作用域`指代码当前上下文，控制着变量和函数的可见性和生命周期。最大的作用是隔离变量，不同作用域下同名变量不会冲突
- `作用域链`指如果在当前作用域中没有查到值，就会向上级作用域查询，直到全局作用域，这样一个查找过程所形成的链条就被称之为作用域链。
- `全局作用域`：代码在程序的任何地方都能被访问，例如 window 对象。但全局变量会污染全局命名空间，容易引起命名冲突。
- `模块作用域` 早期 js 语法中没有模块的定义，因为最初的脚本小而简单。后来随着脚本越来越复杂，就出现了模块化方案（AMD、CommonJS、UMD、ES6 模块等）。通常一个模块就是一个文件或者一段脚本，而这个模块拥有自己独立的作用域。
- `函数作用域` 顾名思义由函数创建的作用域。闭包就是在该作用域下产生，后面我们会单独介绍。
- `块级作用域` 由于 js 变量提升存在变量覆盖、变量污染等设计缺陷，所以 ES6 引入了块级作用域关键字来解决这些问题。典型的案例就是 let 的 for 循环和 var 的 for 循环。

## 闭包

- 闭包是指有权访问另一个函数作用域中变量的函数
- 形成闭包的原因：内部的函数存在外部作用域的引用就会导致闭包
- 闭包的作用：1.保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。2.保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化
- 使用场景：
  - return 回一个函数
  - 函数作为参数
  - IIFE（自执行函数）
  - 循环赋值
  - 使用回调函数就是在使用闭包
  - 节流防抖
  - 柯里化实现
- `注意`：容易导致内存泄漏。闭包会携带包含其它的函数作用域，因此会比其他函数占用更多的内存。过度使用闭包会导致内存占用过多，所以要谨慎使用闭包

## 原型和原型链

- 有对象的地方就有`原型`，每个对象都会在其内部初始化一个属性，就是 prototype(原型)，原型中存储共享的属性和方法。当我们访问一个对象的属性时，js 引擎会先看当前对象中是否有这个属性，如果没有的就会查找他的 prototype 对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象。这么一个寻找的过程就形成了`原型链`的概念。

```js
const arr = [1, 2, 3];
arr.__proto__ === Array.prototype; // true
arr.__proto__.__proto__ === Object.prototype; // true
Array.__proto__ === Function.prototype; // true
```

## this 指向

- this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象

1. 作为对象的方法调用，this 指向该对象

```js
var obj = {
  a: 1,
  getA: function () {
    alert(this === obj); // 输出:true alert ( this.a ); // 输出: 1
  },
};
obj.getA();
```

2. 作为普通函数调用,this 总是指向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象

```js
window.name = "globalName";
var getName = function () {
  return this.name;
};
console.log(getName()); // 输出:globalName

window.name = "globalName";
var myObject = {
  name: "sven",
  getName: function () {
    return this.name;
  },
};
var getName = myObject.getName;
console.log(getName()); // globalName
```

3. 构造器调用

- 当用 new 运算符调用函数时，该函数总 会返回一个对象，通常情况下，构造器里的 this 就指向返回的这个对象

```js
var MyClass = function () {
  this.name = "sven";
};
var obj = new MyClass();
alert(obj.name); // 输出:sven
```

- 如果构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this

```js
var MyClass = function () {
  this.name = "sven";
  return {
    // 显式地返回一个对象
    name: "anne",
  };
};
var obj = new MyClass();
alert(obj.name); // 输出:anne
```

4. Function.prototype.call 或 Function.prototype.apply 调用,可以动态地 改变传入函数的 this:

## 事件循环

- js 单线程的特性，非阻塞：通过 event loop 实现
- 执行栈: 同步代码的执行，按照顺序添加到执行栈中
- 事件队列: 异步代码的执行，遇到异步事件不会等待它返回结果，而是将这个`事件挂起`，继续执行执行栈中的其他任务。当异步事件返回结果，将它放到事件队列中，被放入事件队列不会立刻执行起回调，而是等待当前执行栈中所有任务都执行完毕，主线程空闲状态，主线程会去查找事件队列中是否有任务，如果有，则取出排在第一位的事件，并把这个事件对应的回调放到执行栈中，然后执行其中的同步代码。
- `事件挂起`:浏览器是多线程的，挂到浏览器的其他线程，如定时器触发线程、 异步 HTTP 请求线程等线程、事件触发线程、gui 渲染线程，这些线程主要不是来执行 JS 代码的
- 宏任务：script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)
- 微任务： Promise、MutaionObserver、process.nextTick(Node.js 环境)；
- js 会先从宏任务队列中取出第一个宏任务，执行完毕后，执行微任务队列中的所有微任务，其中产生的微任务也会一起执行，直到微任务队列为空，才会从宏任务队列取出下一个宏任务（一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。）
- 宏任务和微任务的本质区别：微任务：不需要特定的异步线程去执行，没有明确的异步任务去执行，只有回调；宏任务：需要特定的异步线程去执行，有明确的异步任务去执行，有回调；

## Promise 中的 then 第二个参数 reject 和 catch 的区别

- reject 是用来抛出异常的，catch 是用来处理异常的
- reject 是 Promise 的方法，而 then 和 catch 是 Promise 实例的方法
- 在 then 的第一个函数里抛出了异常，后面的 catch 能捕获到，而 reject 捕获不到
- 如果是 promise 内部报错，reject 抛出错误后，then 的第二个参数和 catch 方法都存在的情况下，只有 then 的第二个参数能捕获到，如果 then 的第二个参数不存在，则 catch 方法会捕获到。

## JS 的 6 种加载方式

#### 正常模式

- `<script src="index.js"></script>`
- JS 会阻塞 dom 渲染，浏览器必须等待 index.js 加载和执行完成后才能去做其它事情

#### async 模式

- `<script async src="index.js"></script>`
- 加载是异步的，JS 不会阻塞 DOM 的渲染，async 加载是无顺序的，当它加载结束，JS 会立即执行
- 使用场景：若该 JS 资源与 DOM 元素没有依赖关系，也不会产生其他资源所需要的数据时，可以使用 async 模式，比如埋点统计

#### defer 模式

- `<script defer src="index.js"></script>`
- JS 的加载也是异步的，defer 资源会在 DOMContentLoaded 执行之前，并且 defer 是`有顺序`的加载,按照引入的前后顺序执行

#### module 模式

- `<script type="module">import { a } from './a.js'</script>`
- script 标签的属性可以加上 type="module"，浏览器会对其内部的 import 引用发起 HTTP 请求，获取模块内容。这时 script 的行为会像是 defer 一样，在后台下载，并且等待 DOM 解析
- Vite 就是利用浏览器支持原生的 es module 模块，开发时跳过打包的过程，提升编译效率

#### preload

- `<link rel="preload" as="script" href="index.js">`
- 用于提前加载一些需要的依赖，这些资源会优先加载,`立即加载`
- preload 加载的资源是在浏览器渲染机制之前进行处理的，并且不会阻塞 onload 事件；
- preload 加载的 JS 脚本其加载和执行的过程是分离的，即 preload 会预加载相应的脚本代码，待到需要时自行调用

#### prefetch

- `<link rel="prefetch" as="script" href="index.js">`
- prefetch 是利用浏览器的`空闲时间`，加载页面将来可能用到的资源的一种机制；通常可以用于加载其他页面（非首页）所需要的资源，以便加快后续页面的打开速度,不会立即执行
- pretch 加载的资源可以获取非当前页面所需要的资源，并且将其放入缓存至少 5 分钟（无论资源是否可以缓存）
- 当页面跳转时，未完成的 prefetch 请求不会被中断
- 优先级高于 preload

## async await 输出顺序

- [async await 输出顺序](https://juejin.cn/post/7194744938276323384)
- async 函数返回值, async 函数在抛出返回值时，会根据返回值类型开启不同数目的微任务
  - return 结果值：非 thenable、非 promise（不等待）
  - return 结果值：thenable（等待 1 个 then 的时间）
  - return 结果值：promise（等待 2 个 then 的时间）
- await 右值类型区别
  - 接非 thenable 类型，会立即向微任务队列添加一个微任务 then，但不需等待
  - 接 thenable 类型，需要等待一个 then 的时间之后执行
  - 接 Promise 类型(有确定的返回值)，会立即向微任务队列添加一个微任务 then，但不需等待

## Proxy

- Proxy ：用于创建一个对象的代理，从而实现基本操作的拦截和自定义

```js
var proxy = new Proxy(target, handler);
// 取消代理
Proxy.revocable(target, handler);
```

- target 表示所要拦截的目标对象（任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler 通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时的代理行为
- handler 拦截属性
  - `get`(target,propKey,receiver)：拦截对象属性的读取
  - `set`(target,propKey,value,receiver)：拦截对象属性的设置
  - has(target,propKey)：拦截 propKey in proxy 的操作，返回一个布尔值
  - `deleteProperty`(target,propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值
  - ownKeys(target)：拦截 Object.keys(proxy)、for...in 等循环，返回一个数组
  - getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
  - defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc），返回一个布尔值
  - preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值
  - getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象
  - isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值
  - setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值
  - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作
  - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作

## Reflect

- Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API
- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
- 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。

  ```js
  // 老写法
  try {
    Object.defineProperty(target, property, attributes);
    // success
  } catch (e) {
    // failure
  }

  // 新写法
  if (Reflect.defineProperty(target, property, attributes)) {
    // success
  } else {
    // failure
  }
  ```

- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。

  ```js
  // 老写法
  "assign" in Object; // true

  // 新写法
  Reflect.has(Object, "assign"); // true
  ```

- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。

## 字符串模版渲染

```js
var greeting = "My name is ${name}, age ${age}, I am a ${job.jobName}";
var employee = {
  name: "XiaoMing",
  age: 11,
  job: {
    jobName: "designer",
    jobLevel: "senior",
  },
};
var result = greeting.render(employee);
console.log(result); //

// 方法一 正则
String.prototype.render = function (obj) {
  const str = this;
  return str.replace(/\${([.\w]+)}/, (match, p1) => {
    const keyArr = p1?.split(".");
    let val = obj;
    keyArr.forEach((key) => {
      val = val[key];
    });
    return val;
  });
};

// 方法二 eval
String.prototype.render = function (obj) {
  // 利用了ES6的解构、对象keys新方法，在函数内部解构并自动展开变量
  eval(`var {${Object.keys(obj).join(",")}} = obj`); // 利用eval使字符串直接作为ES6解析
  return eval("`" + this + "`");
};

// 方法三 with
// 代码由掘金大神@一口怪兽一口烟提供
String.prototype.render = function (obj) {
  with (obj) {
    return eval("`" + this + "`");
  }
};
```

## 深浅拷贝

#### 浅拷贝

1. Object.assign(target, ...sources)
   - 它不会拷贝对象的继承属性；
   - 它不会拷贝对象的不可枚举的属性；
   - 可以拷贝 Symbol 类型的属性。
2. 扩展运算符
3. concat 拷贝数组
4. slice 拷贝数组,arr.slice(begin, end)
   - 浅拷贝只能拷贝一层对象。如果存在对象的嵌套，只是拷贝的地址

#### 深拷贝

1. JSON.stringify
   - 会忽略 undefined
   - 会忽略 symbol
   - 不能序列化函数
   - 无法拷贝不可枚举的属性
   - 无法拷贝对象的原型链
   - 拷贝 RegExp 引用类型会变成空对象
   - 拷贝 Date 引用类型会变成字符串
   - 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null
   - 不能解决循环引用的对象，即对象成环 (obj[key] = obj)。
2. 手写递归（没有类型判断）
3. 手写递归（包含类型判断）

   ```js
   const isComplexDataType = (obj) =>
     (typeof obj === "object" || typeof obj === "function") && obj !== null;

   const deepClone = function (obj, hash = new WeakMap()) {
     if (obj.constructor === Date) {
       return new Date(obj); // 日期对象直接返回一个新的日期对象
     }

     if (obj.constructor === RegExp) {
       return new RegExp(obj); //正则对象直接返回一个新的正则对象
     }

     //如果循环引用了就用 weakMap 来解决
     if (hash.has(obj)) {
       return hash.get(obj);
     }
     let allDesc = Object.getOwnPropertyDescriptors(obj); //获取obj 所有属性的描述符

     //遍历传入参数所有键的特性
     let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

     // 把cloneObj原型复制到obj上
     hash.set(obj, cloneObj);

     for (let key of Reflect.ownKeys(obj)) {
       cloneObj[key] =
         isComplexDataType(obj[key]) && typeof obj[key] !== "function"
           ? deepClone(obj[key], hash)
           : obj[key];
     }
     return cloneObj;
   };
   ```

## Object.create()、new Object()和{}的区别

- new Object()和{}字面量，创建的新对象的**proto**都指向 Object.prototype，只是字面量创建更高效一些，少了**proto**指向赋值和 this。
- Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。
- `Object.create(proto[, propertiesObject])`
- proto 必填参数，是新对象的原型对象，如上面代码里新对象 me 的**proto**指向 person。注意，如果这个参数是 null，那新对象就彻彻底底是个空对象，没有继承 Object.prototype 上的任何属性和方法，如 hasOwnProperty()、toString()等。
- propertiesObject 是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用 hasOwnProperty()获取的，而不是原型对象上的）的描述符及相应的属性名称。使用 getOwnPropertyDescriptors 可以获取对象属性的描述符

## 点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？

- 点击刷新按钮或者按 F5： 浏览器直接对本地的缓存文件过期，但是会带上 If-Modifed-Since，If-None-Match，这就意味着服务器会对文件检查新鲜度，返回结果可能是 304，也有可能是 200。
- 用户按 Ctrl+F5（强制刷新）： 浏览器不仅会对本地文件过期，而且不会带上 If-Modifed-Since，If-None-Match，相当于之前从来没有请求过，返回结果是 200。
- 地址栏回车： 浏览器发起请求，按照正常流程，本地检查是否过期，然后服务器检查新鲜度，最后返回内容。

## js 生成随机数

```js
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

## 堆栈区别

- 栈内存 堆内存
- 存储基础数据类型 存储引用数据类型
- 按值访问 按引用访问
- 存储的值大小固定 存储的值大小不定，可动态调整
- 由系统自动分配内存空间 由开发者通过代码进行分配
- 主要用来执行程序 主要用来存放对象
- 空间小，运行效率高 空间大，但是运行效率相对较低
- 先进后出，后进先出 无序存储，可根据引用直接获取

## js 控制并发

```js
const pify = require("pify"); //函数promise化

class RequestDecorator {
  constructor({ maxLimit = 5, requestApi, needChange2Promise }) {
    // 最大并发量
    this.maxLimit = maxLimit;
    // 请求队列,若当前请求并发量已经超过maxLimit,则将该请求加入到请求队列中
    this.requestQueue = [];
    // 当前并发量数目
    this.currentConcurrent = 0;
    // 使用者定义的请求api，若用户传入needChange2Promise为true,则将用户的callback类api使用pify这个库将其转化为promise类的。
    this.requestApi = needChange2Promise ? pify(requestApi) : requestApi;
  }
  // 发起请求api
  async request(...args) {
    // 若当前请求数并发量超过最大并发量限制，则将其阻断在这里。
    // startBlocking会返回一个promise，并将该promise的resolve函数放在this.requestQueue队列里。这样的话，除非这个promise被resolve,否则不会继续向下执行。
    // 当之前发出的请求结果回来/请求失败的时候，则将当前并发量-1,并且调用this.next函数执行队列中的请求
    // 当调用next函数的时候，会从this.requestQueue队列里取出队首的resolve函数并且执行。这样，对应的请求则可以继续向下执行。
    if (this.currentConcurrent >= this.maxLimit) {
      await this.startBlocking();
    }
    try {
      this.currentConcurrent++;
      const result = await this.requestApi(...args);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      console.log("当前并发数:", this.currentConcurrent);
      this.currentConcurrent--;
      this.next();
    }
  }
  // 新建一个promise,并且将该reolsve函数放入到requestQueue队列里。
  // 当调用next函数的时候，会从队列里取出一个resolve函数并执行。
  startBlocking() {
    let _resolve;
    let promise2 = new Promise((resolve, reject) => (_resolve = resolve));
    this.requestQueue.push(_resolve);
    return promise2;
  }
  // 从请求队列里取出队首的resolve并执行。
  next() {
    if (this.requestQueue.length <= 0) return;
    const _resolve = this.requestQueue.shift();
    _resolve();
  }
}

module.exports = RequestDecorator;

//示例
const RequestDecorator = require("../src/index.js");

// 一个callback类型的请求api
function delay(num, time, cb) {
  setTimeout(() => {
    cb(null, num);
  }, time);
}

// 通过maxLimit设置并发量限制，needChange2Promise将callback类型的请求api转化为promise类型的。
const requestInstance = new RequestDecorator({
  maxLimit: 5,
  requestApi: delay,
  needChange2Promise: true,
});

let promises = [];
for (let i = 0; i < 30; i++) {
  // 接下来你就可以像原来使用你的api那样使用它,参数和原来的是一样的
  promises.push(
    requestInstance.request(i, Math.random() * 3000).then(
      (result) => console.log("result", result),
      (error) => console.log(error)
    )
  );
}
async function test() {
  await Promise.all(promises);
}

test();
```

## js 生成 UUID

- 一般使用的 UUID 是个 36 位的字符串,其格式如下:
- `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` 其中第 15 位数是 4,第 20 位是 8 到 b 这 4 个中的一个

```js
function getUuid() {
  // 先判断是否引入 crypto
  if (typeof crypto === "object") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (
      typeof crypto.getRandomValues === "function" &&
      typeof Uint8Array === "function"
    ) {
      const callback = (c) => {
        const num = Number(c);
        return (
          num ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))
        ).toString(16);
      };
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback);
    }
  }
  // 使用日期+随机数
  let timestamp = new Date().getTime();
  let perforNow =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (perforNow + random) % 16 | 0;
      perforNow = Math.floor(perforNow / 16);
    }
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

// URL.createObjectURL
function UUID() {
  let str = URL.createObjectURL(new Blob());
  URL.revokeObjectURL(str);
  return str.split("/")[1];
}
```
