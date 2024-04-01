# Flask 框架

## 启动命令

-   --app 这个参数来指定要运行的 app 名称,如果不指定的话，flask 会去寻找名叫 app.py 或者 wsgi.py 的文件。如果你有这两个文件，那么就可以直接使用 flask run 来运行了,`flask --app first run ` 这里的 flask 相当于 python -m flask

-   远程访问 `flask run --host=0.0.0.0`

## 路由 Routing

-   默认为 get 请求

```py
@app.route('/test')
def test123():
    return '我是一个测试'
```

-   动态路由

```py
from markupsafe import escape # markupsafe的escape方法，可以对输入的字符串进行转义，从而避免了恶意的攻击

@app.route('/student/<name>')
def what_is_your_name(name):
    return f'你的名字是: {escape(name)}'
```

-   动态参数类型
    -   string 默认类型，可以接收除了/之外的任何字符串
    -   int 可以接收正整数
    -   float 可以接收正的浮点数
    -   path 和 string 类似，但是可以接收/
    -   uuid 接收 uuid 字符串

```py
@app.route('/path/<path:subpath>')
def what_is_your_path(subpath):
    return f'你的路径是: {escape(subpath)}'
```

-   string 和 path 的区别，就在于 path 可以接收/,而 string 不能

-   不同的 http 方法
    -   `@app.route('/diffMethod', methods=['GET', 'POST'])`
    -   `@app.get('/getMethod')  @app.post('/postMethod')`

## 静态文件

-   urL_for 的第一个参数是方法名，后面接的是 url 中定义的变量，如果 url 中并没有这个变量，那么将会以参数的形式附加在 url 的后面：

```py
@app.route('/')
def index():
    return 'index'

@app.route('/login')
def login():
    return 'login'

@app.route('/user/<username>')
def profile(username):
    return f'{username}\'s profile'

with app.test_request_context():
    print(url_for('index'))
    print(url_for('login'))
    print(url_for('login', next='/'))
    print(url_for('profile', username='John Doe'))

/
/login
/login?next=/
/user/John%20Doe
```

## 模板（Jinja2）

```py
from flask import render_template

@app.route('/template/<name>')
def use_template(name=None):
    return render_template('hello.html', name=name)
```

1. 控制结构 {% %}
2. 变量取值 {{ }}
3. 注释 {# #}

```js
{% for file in filenames %}  // for循环
    ...
{% endfor %} // 要以endfor结尾


{% if daxin.safe %} // if语句
daxin is safe.
{% elif daxin.dead %}
daxin is dead
{% else %}
daxin is okay
{% endif %}

// 过滤器
// safe	 渲染时值不转义
// capitialize	 把值的首字母转换成大写，其他子母转换为小写
//  lower	 把值转换成小写形式
//  upper	 把值转换成大写形式
//  title	 把值中每个单词的首字母都转换成大写
//  trim	 把值的首尾空格去掉
//  striptags	 渲染之前把值中所有的HTML标签都删掉
// join 	 拼接多个值为字符串
//  replace	 替换字符串的值
//  round	 默认对数字进行四舍五入，也可以用参数进行控制
// int 	 把值转换成整型
{{ "hello world" | replace('world','daxin') | upper }}  // HELLO DAXIN
```

## 蓝图
