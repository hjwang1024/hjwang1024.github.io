# Node 基础

## Stream

-   fs.createReadStream(path) 创建流
-   Stream.pipe() 读取一个文件(ReadableStream)并把其中的内容写到另一个文件中(WritableStream),所有 ReadableStream 都能接入任何一个 WritableStream。比如 HTTP 请求(req)对象就是 ReadableStream，可以让其中的内容流动到文件中

    ```js
    var readStream = fs.createReadStream('./original.txt')
    var writeStream = fs.createWriteStream('./to.txt')
    readStream.pipe(writeStream)

    req.pipe(fs.createWriteStream('./req-body.txt'))

    var stream = fs.createReadStream(path)
    stream.pipe(res) // res.end()会在stream.pipe()内部调用
    ```

## 处理服务器错误

在 Node 中，所有继承了 EventEmitter 的类都可能会发出 error 事件。像 fs.ReadStream 这样的流只是专用的 EventEmitter，有预先定义的 data 和 end 等事件，默认情况下，如果没有设置监听器，error 事件会被抛出

-   fs.stat() 调用获取文件的相关信息，如果文件不存在，fs.stat()会在 err.code 中放入 ENOENT 作为响应，然后可以返回错误码 404，向客户端表明文件未找到。如果 fs.stat()返回了其他错误码，可以返回通用的错误码 500。
    ```js
    fs.stat(path, function (err, stat) {
        if (err) {
            if (err.code == 'ENOENT') {
                res.statusCode == 404
                res.send('Not Found')
            } else {
                res.statusCode == 500
                res.send('Internal Server Error')
            }
        } else {
            res.setHeader('Contend-Length', stat.size)
            var stream = fs.createReadStream(path)
            stream.pipe(res)
            stream.on('error', function (err) {
                res.statusCode = 500
                res.end('Internal Server Error')
            })
        }
    })
    ```

## process

-   process.argv node 执行命令行的参数
-   process.cwd() 工作目录

## path.resolve 和 path.join 的区别

1.  - `path.join`仅用作路劲拼接
    - `path.resolve`会始终返回根路径，如果路径最前边没有`/`，会默认加`/`'
2. 拼接路径时，`path.resolve`会把参数中有`/`的参数视为根路径下，eg:
    ```js
    path.join('/a', '/b') // /a/b
    path.resolve('/a', '/b') // /b
    ```
