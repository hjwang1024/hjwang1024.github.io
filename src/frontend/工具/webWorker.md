# <center>Web Worker</center>

## 介绍

为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给 Worker 线程运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。
***本质上***Web Worker并没有改变JavaScript单线程这一事实，它借助的是浏览器的多线程

## 特点

1、一旦新建，则不会被主线程打断。即便是主线程卡死，Web Worker仍然运行中

2、Web Worker也受同源策略限制，同源网页才能访问

3、不能操作和访问DOM

4、不能使用全局交互方法（alert、confirm等），其他全局方法基本可以使用

	- XMLHttpRequest  构造函数
- setTimeout()`, `setInterval()`, `clearTimeout()`, `clearInterval()
- navigator对象 **注意:** workerNavigator不能使用[sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)方法(可以向web服务器上报数据)

5、不能读取本地文件（其实浏览器本身就禁止JavaScript读取本地文件，出于安全考虑）

6、worker线程与主线程不共享作用域与资源，且线程中传递的对象是深拷贝

7、Web Worker有两种：

- `Dedicated Web Worker`：专用线程，只能在一个网页里使用这个线程
- `Shared Web Worker`：共享线程，可以在多个同源的网页中共享（跨页面通信解决方案）



## 使用方法

### 1.原生

```js
// index.js
if (window.Worker) {
  // 实例一个 Woeker 
  //第一个参数是脚本文件 由于 Worker 不能读取本地文件，所以这个脚本必须来自网络 且必须遵守同源政策
  const worker = new Worker("worker.js",{name:'worker1'}) 

  // 使用 postMessage 传输信息到目标文件
  worker.postMessage(2000000)

  // 使用 onmessage 接受信息
  worker.onmessage = (e) => {
    console.log(e.data)
  };

  // 使用 onerror 处理worker线程发生错误时的回调
  worker.onerror = function (e) {
    console.log("error at " + e.filename + ":" + e.lineno + e.message)
  };
}
// 取消worker
worker.terminate()
```

```js
// worker.js
// 使用 importScripts 进行文件的引用，可引用 url、本地js文件
importScripts('xxxxxxx')
// importScripts('xxxxxxx', 'xxxxxxxx') 也可以传多个

// 模拟数据处理
function handleData(num) {
  let str = ''
  for (let i = 0; i < num; i++) {
      str += i
  }
}

onmessage = async (e) => {
  console.time('处理数据时间')
  const res = handleData(e.data)
  postMessage('处理完了')
  console.timeEnd('处理数据时间')
}
// 关闭
close()
```

### 2.vue中使用

- 安装 worker-loader

  ```js
  module.exports = {
  	...
  	configureWebpack: config => {
      	config.module.rules.push({
        	test: /\.worker.js$/,
        	use: {
          	loader: 'worker-loader',
                  // 允许将内联的 web worker 作为 BLOB
                  options: {inline: 'no-fallback' } //不同webpack 配置参数不同
        	},
      })
    },
    parallel: false, // 打包报错的配置
  ```

- worker文件引入

  ```js
  import Worker from  './worker/web.worker'
  let worker = new Worker();
  ```
- [vue-中使用vue-worker](https://juejin.cn/post/7198476152624595005)

  

  

## 使用场景

1、密集型计算任务 (递归、计算、数据处理、大文件上传)，

2、用户行为捕捉(埋点、监控)，心跳检测等一些高频请求(轮询 或 websocket)

## 举例

#### 使用Web Worker进行心跳检测(轮询)

#### Web Worer和WebSocket



## 其他操作

1、worker中创建新worker

2、使用共享线程