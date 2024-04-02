# Express

## 环境驱动配置系统

-   设置环境变量

```js
// UNIX
NODE_ENV=production node app
// Windows:
set NODE_ENV=production
node app
// 这些环境变量会出现在你程序里的process.env对象中。
```

1. app.configure()
   方法接受一个表示环境的可选字符串，以及一个函数。当环境与传入的字符串相匹配时，回调函数会被立即调用;当只给出函数时，在所有环境中 都会调用它

```js
app.configure(function () {
    // 所有环境
    app.set('views', __dirname + '/views')
    app.set('view engine', 'ejs')
})
app.configure('development', function () {
    // 仅开发环境
    app.use(express.errorHandler)
})
```

2. app.set() 和 app.get()

    - app.configure()只是糖衣,逻辑相同

    ```js
    var env = process.env.NODE_ENV || 'development'
    app.set('views', __dirname + '/views')
    app.set('view engine', 'ejs')
    if (env == 'development') {
        app.use(express.errorHandler)
    }
    ```

3. app.enable() 和 app.disable()
    - app.enable(setting)等同于 app.set(setting, true)
