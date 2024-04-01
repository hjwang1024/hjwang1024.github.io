# http

## GET 和 POST 区别

1. “约定和规范”上的区别，即 get 用来获取资源，post 用来传输数据(增删改)，get 参数拼加到 URL，post 放到请求正文中
2. 缓存，get 请求一般会被缓存，常见的 css,js,html，而 post 请求事不进行缓存的
3. 数据量，由于 get 请求参数是通过 url 传输的，而 url 是有长度限制的，通常为 2k，post 请求参数是放到请求体中的，所以没有限制
4. 安全性，get 请求参数放到 url，会被保存到历史记录中，性对于 post 不够安全
5. 参数类型，get 请求只允许 ascll 字符，而 post 支持更多数据类型（图片，文件，formdata）
6. post 会发送两次请求，第一次为 options 预检请求，状态码为 204，预检请求会询问服务器是否支持修改的请求头，检测服务器是否为同源请求,是否支持跨域，第二次为真正的 post 请求

## Request Header

-   Accept:浏览器能够处理的内容类型，（常见为*/*）
-   Accept-Charset:浏览器能够显示的字符集
-   Accept-Encoding：浏览器能够处理的压缩编码（常见为 gzip, deflate）
-   Accept-Language：浏览器当前设置的语言（zh-CN,zh;q=0.9）
-   Connection：浏览器与服务器之间连接的类型
    -   keep-alive 当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。
    -   close 代表一个 Request 完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接会关闭， 当客户端再次发送 Request，需要重新建立 TCP 连接。
-   Cookie：当前页面设置的任何 Cookie
-   Host：发出请求的页面所在的域
-   Referer：发出请求的页面的 URL
-   User-Agent：浏览器的用户代理字符串（客户端使用的操作系统和浏览器的名称和版本）
-   Cache-Control：客户端的缓存策略
    -   private 私有的缓存，不能再用户间共享
    -   public 响应会被缓存，并且在多用户间共享
    -   no-cache 响应不会被缓存,而是实时向服务器端请求资源
    -   max-age=10 设置缓存最大的有效时间
    -   no-store 在任何条件下，响应都不会被缓存，并且不会被写入到客户端的磁盘里

## Responses Header

-   Date：表示消息发送的时间，时间的描述格式由 rfc822 定义
-   server:服务器名称
-   Connection：浏览器与服务器之间连接的类型
-   Cache-Control：控制 HTTP 缓存
-   Expires：缓存相关，缓存到期时间
-   Last-Modified：所请求的对象的最后修改日期
-   Content-Length：响应长度，值是字节长度，不是字符长度，Node 提供了一个 Buffer.byteLength()方法
-   content-type:表示后面的文档属于什么 MIME 类型
    -   application/x-www-form-urlencoded：浏览器的原生 form 表单
    -   multipart/form-data：常见的 POST 提交方式，表单上传
    -   application/json：服务器消息主体是序列化后的 JSON 字符串。
    -   text/xml：该种方式主要用来提交 XML 格式的数据。

## HTTP 1.0 和 HTTP 1.1 的区别

-   连接方式：1.1 默认使用长连接，而 1.0 默认使用短连接（开启方式`Connection: Keep-alive`）,客户端和服务器每进行一次 HTTP 操作，就建立一次连接，任务结束就中断连接，下次请求再次建立 tcp 连接，会造成资源浪费。
-   状态响应码：1.1 中新加入了大量的状态码，光是错误响应状态码就新增了 24 种。比如说，100 (Continue)​——在请求大资源前的预热请求，206 (Partial Content)​——范围请求的标识码，409 (Conflict)​——请求与当前资源的规定冲突，410 (Gone)——资源已被永久转移，而且没有任何已知的转发地址。
-   缓存处理：在 1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，HTTP1.1 则引入了更多的缓存控制策略例如 Entity tag，If-Unmodified-Since, If-Match, If-None-Match 等更多可供选择的缓存头来控制缓存策略。
-   Host 头处理：1.1 在请求头中加入了 Host 字段,用来指定服务器的域名.
-   带宽优化及网络连接的使用，1.1 在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
-   http1.1 相对于 http1.0 还新增了很多请求方法，如 PUT、HEAD、OPTIONS 等。

## HTTP 1.1 和 HTTP 2.0 的区别

-   二进制协议：HTTP/2 是一个二进制协议。在 HTTP/1.1 版中，报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"，可以分为头信息帧和数据帧。 帧的概念是它实现多路复用的基础。
-   多路复用： HTTP/2 实现了多路复用，HTTP/2 仍然复用 TCP 连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回应，而且不用按照顺序一一发送，这样就避免了"队头堵塞"【1】的问题。
-   数据流： HTTP/2 使用了数据流的概念，因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流。每个数据流都有一个独一无二的编号。数据包发送时，都必须标记数据流 ID ，用来区分它属于哪个数据流。
-   头信息压缩： HTTP/2 实现了头信息压缩，由于 HTTP 1.1 协议不带状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如 Cookie 和 User Agent ，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就能提高速度了。
-   服务器推送： HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。使用服务器推送提前给客户端推送必要的资源，这样就可以相对减少一些延迟时间。这里需要注意的是 http2 下服务器主动推送的是静态资源，和 WebSocket 以及使用 SSE 等方式向客户端发送即时数据的推送是不同的。

## 301 和 302 的区别。

-   301 和 302 状态码都表示重定向，就是说浏览器在拿到服务器返回的这个状态码后会自动跳转到一个新的 URL 地址，这个地址可以从响应的 Location 首部中获取（用户看到的效果就是他输入的地址 A 瞬间变成了另一个地址 B）——这是它们的共同点。

-   他们的不同在于。301 表示旧地址 A 的资源已经被永久地移除了（这个资源不可访问了），搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址；

-   302 表示旧地址 A 的资源还在（仍然可以访问），这个重定向只是临时地从旧地址 A 跳转到地址 B，搜索引擎会抓取新的内容而保存旧的网址。
-   SEO302 好于 301

## Server-Sent Events 服务器推送事件

-   简称 SSE，是一种服务端实时主动向浏览器推送消息的技术，SSE 是 HTML5 中一个与通信相关的 API，主要由两部分组成：服务端与浏览器端的通信协议（HTTP 协议）及浏览器端可供 JavaScript 使用的 EventSource 对象。

#### 对比

<table>
    <thead>
        <tr>
            <th></th>
            <th>Server-Sent Events API</th>
            <th>WebSockets API</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>协议</td>
            <td>HTTP</td>
            <td>TCP</td>
        </tr>
        <tr>
            <td>通讯方式</td>
            <td>单工，只能服务端单向发送消息</td>
            <td>全双工，可以同时发送和接收消息</td>
        </tr>
        <tr>
            <td>发送内容类型</td>
            <td>文本或使用 Base64 编码和 gzip 压缩的二进制消息	</td>
            <td>类型广泛</td>
        </tr>
        <tr>
            <td>自定义事件</td>
            <td>支持自定义事件类型</td>
            <td>不支持自定义事件类型</td>
        </tr>
        <tr>
            <td>连接数</td>
            <td>连接数 HTTP/1.1 6 个，HTTP/2 可协商（默认 100）	</td>
            <td>连接数无限制</td>
        </tr>
    </tbody>
</table>

#### 实现

-   服务端响应 header
    -   Content-Type: text/event-stream
    -   Cache-Control: no-cache(确保浏览器可以实时显示服务端发送的数据)
    -   Connection: keep-alive
-   消息格式
    -   EventStream（事件流）为 UTF-8 格式编码的文本或使用 Base64 编码和 gzip 压缩的二进制消息。
        每条消息由一行或多行字段（event、id、retry、data）组成，每个字段组成形式为：字段名:字段值。字段以行为单位，每行一个（即以 \n 结尾）。以冒号开头的行为注释行，会被浏览器忽略。
        每次推送，可由多个消息组成，每个消息之间以空行分隔（即最后一个字段以\n\n 结尾）。
-   js 使用`EventSource`对象
    -   const eventSource = new EventSource('http_api_url', { withCredentials: true })
    -   readyState
        -   0 浏览器与服务端尚未建立连接或连接已被关闭
        -   1 浏览器与服务端已成功连接，浏览器正在处理接收到的事件及数据
        -   2 浏览器与服务端建立连接失败，客户端不再继续建立与服务端之间的连接
    -   eventSource.close() 关闭连接
    -   EventSource 对象本身继承自 EventTarget 接口
        -   open 事件：当成功连接到服务端时触发。
        -   message 事件：当接收到服务器发送的消息时触发。该事件对象的 data 属性包含了服务器发送的消息内容。
        -   error 事件：当发生错误时触发。该事件对象的 event 属性包含了错误信息。
-   示例

```js
// server.js
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    if (req.url === '/') {
        // 如果请求根路径，返回 index.html 文件
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
         });
     } else if (req.url === '/events') {
         // 如果请求 /events 路径，建立 SSE 连接
         res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
         // 每隔 1 秒发送一条消息
         let id = 0;
         const intervalId = setInterval(() => {
             res.write(`event: customEvent\n`)
             res.write(`id: ${id}\n`)
             res.write(`retry: 30000\n`)
             const data = { id, time: new Date().toISOString()}
             res.write(`data: ${JSON.stringify(data)}\n\n`);
             id++
          }, 1000);
          // 当客户端关闭连接时停止发送消息
          req.on('close', () => {
              clearInterval(intervalId);
              id = 0
              res.end();
          });
    } else {
        // 如果请求的路径无效，返回 404 状态码
        res.writeHead(404);
        res.end();
    }

}).listen(3000);

console.log('Server listening on port 3000');

// html
<body>
    <h1>SSE Demo</h1>
    <button onclick="connectSSE()">建立 SSE 连接</button>
    <button onclick="closeSSE()">断开 SSE 连接</button> <br /> <br />
    <div id="message"></div>
    <script>
        const messageElement = document.getElementById('message')
        let eventSource // 建立 SSE 连接
        const connectSSE = () => {
            eventSource = new EventSource('/events') // 监听消息事件
            eventSource.addEventListener('customEvent', (event) => {
                const data = JSON.parse(event.data)
                messageElement.innerHTML += `${data.id} --- ${data.time}` + '<br />'
             })
            eventSource.onopen = () => {
                messageElement.innerHTML += `SSE 连接成功，状态${eventSource.readyState}<br />`
            }
            eventSource.onerror = () => {
                messageElement.innerHTML += `SSE 连接错误，状态${eventSource.readyState}<br />`
             }
         }
         // 断开 SSE 连接
         const closeSSE = () => {
             eventSource.close()
             messageElement.innerHTML += `SSE 连接关闭，状态${eventSource.readyState}<br />`
         }
      </script>
</body>

```

## 简单请求

-   只要同时满足以下条件就属于简单请求

1. 请求方法是以下三种方法之一：GET、POST、HEAD
2. Http 的头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type。
3. Content-Type 只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain

## 非简单请求

-   会预检请求 (preflight request)，即先预发送 OPTIONS 的请求
    第一次是浏览器使用 OPTIONS 方法发起一个预检请求，第二次才是真正的异步请求
    第一次的预检请求获知服务器是否允许该跨域请求：如果允许，才发起第二次真实的请求；如果不允许，则拦截第二次请求。
    Access-Control-Max-Age 用来指定本次预检请求的有效期，单位为秒，在此期间不用发出另一条预检请求。

## HTTPS

-   HTTP 是超文本传输协议，信息是明文传输，存在安全风险的问题。HTTPS 则解决 HTTP 不安全的缺陷，在 TCP 和 HTTP 网络层之间加入了 SSL/TLS 安全协议，使得报文能够加密传输。

-   HTTP 连接建立相对简单， TCP 三次握手之后便可进行 HTTP 的报文传输。而 HTTPS 在 TCP 三次握手之后，还需进行 SSL/TLS 的握手过程，才可进入加密报文传输。

-   两者的默认端口不一样，HTTP 默认端口号是 80，HTTPS 默认端口号是 443。

-   HTTPS 协议需要向 CA（证书权威机构）申请数字证书，来保证服务器的身份是可信的。

-   HTTPS 采用的是对称加密和非对称加密结合的「混合加密」方式：

    -   在通信建立前采用非对称加密的方式交换「会话秘钥」，后续就不再使用非对称加密。
    -   在通信过程中全部使用对称加密的「会话秘钥」的方式加密明文数据。
    -   采用「混合加密」的方式的原因：
        -   对称加密只使用一个密钥，运算速度快，密钥必须保密，无法做到安全的密钥交换。
        -   非对称加密使用两个密钥：公钥和私钥，公钥可以任意分发而私钥保密，解决了密钥交换问题但速度慢。
