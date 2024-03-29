## Generator函数

- Generator 函数是一个状态机，封装了多个内部状态。 执行 Generator 函数会返回一个遍历器对象
- 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号(*)；二是，函数体内部使用yield表达式，定义不同的内部状态。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
const g = gen()
console.log(g); // 打印值为gen函数 而非4

```

- Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
const g = gen()
console.log(g); // 打印值为gen函数 而非4
console.log(g.next()) // {value:1,done:false}
console.log(g.next()) // {value:2,done:false}
console.log(g.next()) // {value:3,done:false}
console.log(g.next()) // {value:4,done:true} // 表示执行完毕
```

- next里面的参数会赋值为上一次yield的执行结果
```js
function* gen() {
  const num1 = yield 1;
  console.log(num1)
  const num2 = yield 2;
  const num3 = yield 3;
  return 4;
}
const g = gen()
console.log(g); // 打印值为gen函数 而非4
console.log(g.next(123)) // {value:1,done:false}  123赋值到num1 并打印
console.log(g.next()) // {value:2,done:false}
console.log(g.next()) // {value:3,done:false}
console.log(g.next()) // {value:4,done:true}
```

### 实现async await 
```js
// 模拟异步操作
function foo(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 1000);
  })
}

function* gen() {
  const num1 = yield foo(1);
  const num2 = yield foo(num1);
  const num3 = yield foo(num2);
  return num3;
}

// 模拟async
function generatorToaAsync(generatorFn) {
  // ...
  //具有async功能的函数
  return function () {
    const gen = generatorFn()  // 相当于前面加载好整个generator函数,，方便后面.next()去一层一层执行
    return new Promise((resolve, reject) => {
      const next1 = gen.next()
      next1.value.then(res1 => {
        const next2 = gen.next(res1)
        next2.value.then(res2 => {
          const next3 = gen.next(res2)
          next3.value.then(res3 => {
            resolve(gen.next(res3).value)
          })
        })
      })
    })
  }
}
// 模拟async 使用done值 判断是否递归
function generatorToaAsync(generatorFn) {
  //具有async功能的函数
  return function () {
    const gen = generatorFn.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function loop(key=='next',arg) {
        let res = null;
        res = gen[key](arg); // 等价于gen.next(arg)  // { value: Promise { <pending> }, done: false }
        const { value, done } = res;
        if(done) {
          return resolve(value);
        }else {   // 没执行完yield
          // Promise.resolve(value) 为了保证value 中 Promise状态已经变更成'fulfilled'
          Promise.resolve(value).then(val => loop('next',val));
        }
      }

      loop('next')

    })
  }
}

const asyncFn = generatorToaAsync(gen);

// console.log(asyncFn());  // Promise{}

asyncFn().then(res => {
  console.log(res);  // 8
```