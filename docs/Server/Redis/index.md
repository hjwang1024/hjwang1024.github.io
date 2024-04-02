## Mac下安装
- `brew install redis`

- Homebrew安装的软件会默认在`/usr/local/Cellar/`路径下

- redis的配置文件`redis.conf`存放在`/usr/local/etc`路径下

## 使用
- 启动redis服务
```js
// 方式一：使用brew帮助我们启动软件
brew services start redis
// 方式二
redis-server /usr/local/etc/redis.conf

```

- 查看进程
`ps axu | grep redis`

- 强制终止进程
`sudo pkill redis-server`

- 后台运行,可以在redis.conf中将daemonize no,修改成yes


## node中使用redis存储
1. 连接redis
```js
var redis = require('redis')
var client = redis.createClient(6379,'127.0.0.1')
client.on('error',function(error){
    console.log('Error',error)
})
```

2. 使用键值
```js
client.set('color','red',redis.print) // print输出结果，报错输出
client.get('color',function(err,value){
    if(err) thtow err
    console.log('Got: '+value)
})
```

2. 使用哈希表(哈希映射)
```js
client.hmset('camping',{
    'shelter':'2-person tent',
    'cooking':'campstove'
},redis.print)

client.hget('camping','cooking',function(err,value){
    if (err) throw err
    console.log(value)
})

client,hkeys('camping',function(err,keys){
    if (err) throw err
    keys.forEach((key,i)=>{
        console.log(key,i)
    })
})
```

3. 使用链表(类似数组)
```js
client.lpush('tasks','red',redis.print)
client.lpush('tasks','green',redis.print)
client.lrange('tasks',0,-1,(err,items)=>{
    if (err) throw err
    items.forEach((item,i)=>{
        console,log(item,i)
    })
})

```

4. 使用集合
```js
client.sadd('number','123',redis.print)
client.sadd('number','123',redis.print)
client.sadd('number','456',redis.print)
client.smembers('number',(err,members)=>{
    if (err) throw err
    console.log(members)
})
```