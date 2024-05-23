# SSE

-   SSE（Server-Sent Events）是一种用于实现服务器主动向客户端推送数据的技术，也被称为“事件流”（Event Stream）。它基于 `HTTP` 协议，利用了其`长连接`特性，在客户端与服务器之间建立一条持久化连接，并通过这条连接实现服务器向客户端的实时数据推送。

## SSE 和 Socket 区别

-   SSE 基于 HTTP 协议，利用了其长连接特性，通过浏览器向服务器发送一个 HTTP 请求，建立一条持久化的连接。而 WebSocket 则是通过特殊的升级协议（HTTP/1.1 Upgrade 或者 HTTP/2）建立新的 TCP 连接，与传统 HTTP 连接不同。

-   SSE 可以传输文本和二进制格式的数据，但只支持单向数据流，即只能由服务器向客户端推送数据。WebSocket 支持双向数据流，客户端和服务器可以互相发送消息，并且没有消息大小限制。

-   SSE 的连接状态仅有三种：已连接、连接中、已断开。连接状态是由浏览器自动维护的，客户端无法手动关闭或重新打开连接。而 WebSocket 连接的状态更灵活，可以手动打开、关闭、重连等。

-   SSE 的实现比较简单，都是基于 HTTP 协议的，与普通的 Web 应用没有太大差异，因此风险相对较低。WebSocket 则需要通过额外的安全措施（如 SSL/TLS 加密）来确保数据传输的安全性，避免被窃听和篡改，否则可能会带来安全隐患。

-   适用场景，GPT,数据大屏可以使用 SSE, 语音转写, 聊天室

## API

1. EventSource() 构造函数

```js
const eventSource = new EventSource(url, options)
```

-   url：String 类型，表示与服务器建立连接的 URL。必填。
-   options：Object 类型，表示可选参数。常用的可选参数包括：

    -   withCredentials：Boolean 类型，表示是否允许发送 Cookie 和 HTTP 认证信息。默认为 false。
    -   headers：Object 类型，表示要发送的请求头信息。
    -   retryInterval：Number 类型，表示与服务器失去连接后，重新连接的时间间隔。默认为 1000 毫秒。

2. EventSource.readyState 属性

-   readyState 属性表示当前 EventSource 对象的状态，它是一个只读属性，它的值有以下几个：

    -   CONNECTING：表示正在和服务器建立连接。
    -   OPEN：表示已经建立连接，正在接收服务器发送的数据。
    -   CLOSED：表示连接已经被关闭，无法再接收服务器发送的数据。

```js
if (eventSource.readyState === EventSource.CONNECTING) {
    console.log('正在连接服务器...')
} else if (eventSource.readyState === EventSource.OPEN) {
    console.log('已经连接上服务器！')
} else if (eventSource.readyState === EventSource.CLOSED) {
    console.log('连接已经关闭。')
}
```

3. EventSource.close() 方法

-   close() 方法用于关闭 EventSource 对象与服务器的连接，停止接收服务器发送的数据。

```js
eventSource.close()
```

4. EventSource.onopen 事件

-   onopen 事件表示 EventSource 对象已经和服务器建立了连接，并开始接收来自服务器的数据。当 EventSource 对象建立连接时，触发该事件。

```js
eventSource.onopen = function (event) {
    console.log('连接成功！', event)
}
```

5. EventSource.onerror 事件
   onerror 事件表示在建立连接或接收服务器数据时发生了错误。当出现错误时，触发该事件。

```js
eventSource.onerror = function (event) {
    console.log('发生错误：', event)
}
```

6. EventSource.onmessage 事件
   onmessage 事件表示已经接收到服务器发送的数据，当接收到数据时，触发该事件。

```js
eventSource.onmessage = function (event) {
    console.log('接收到数据：', event)
}
```

## 示例

node

```js
import express from 'express'
const app = express()
app.get('/api/sse', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream', //核心返回数据流
        Connection: 'close',
    })
    const data = fs.readFileSync('./index.txt', 'utf8')
    const total = data.length
    let current = 0
    //mock sse 数据
    let time = setInterval(() => {
        console.log(current, total)
        if (current >= total) {
            console.log('end')
            clearInterval(time)
            return
        }
        //返回自定义事件名
        res.write(`event:message_name\n`) / 返回数据
        res.write(`data:${data.split('')[current]}\n\n`)
        current++
    }, 300)
})
app.listen(3000, () => {
    console.log('Listening on port 3000')
})
```

web

```js
const sse = new EventSource('http://localhost:3000/api/sse')

sse.addEventListener('open', e => {
    console.log(e.target)
})
//对应后端nodejs自定义的事件名message_name
sse.addEventListener('message_name', e => {
    console.log(e.data)
})
```
