# mongoDB

## 连接

```js
var mongoose = require('mongoose')
// 监听事件
mongoose.connection.on('connecting', () => {
    console.log('mongoose 开始进行连接')
})

mongoose.connection.on('connected', () => {
    console.log('mongoose 连接成功')
})

mongoose.connection.on('error', err => {
    console.log('mongoose connnect失败', err)
})

var db = mongoose.connect('mongoose://username:password@127.0.0.1:27017/test', err => {
    if (err) throw err
    console.log('success')
})

mongoose.disconnect()
```

## shcema

```js
var Schema = mongoose.Schema
// 模型结构
var UserSchema = new Schema({
    name: String, //'string'
    age: Number,
    sex: {
        type: String,
        default: 'gril',
    },
})
// 模型
const User = mongoose.model('User', UserSchema)
```

## CRUD

-   新增 `Document.save()` `Model.create`

    ```js
    // 通过 Model 创建 Document
    let user = new User({
        name: 'whj',
        age: 25,
        sex: 'boy',
    })
    // 保存
    await user.save()

    // Model.create
    // 新增一条数据
    await User.create({
        name: 'whj',
        age: 25,
        sex: 'boy',
    })
    // 新增多条数据
    await User.create([
        {
            name: 'whj',
            age: 25,
            sex: 'boy',
        },
        {
            name: 'xx',
            age: 24,
            sex: 'girl',
        },
    ])

    // Model.insertMany
    await User.insertMany([
        {
            name: 'whj',
            age: 25,
            sex: 'boy',
        },
        {
            name: 'xx',
            age: 24,
            sex: 'girl',
        },
    ])
    ```

-   查找

    -   `Model.find` ( [过滤规则] , [返回字段]) , [配置项] , callback)
    -   返回字段 可以指定需要返回哪些字段，或者指定不需要哪些字段
    -   配置项可以限制返回条数，排序规则，跳过文档数量

    ```js
    const p2 = await Person.find({}).gte('age', 12).where('n').in(['zhao', 'qian']).select('n age -_id').limit(2).sort({
        age: -1,
    })
    ```

    -   Model.findOne | Model.findById()
    -   findOne 的使用方式和 find 一样，适用于只查询一条数据

-   更新
-   update 系列的方法主要有

    -   Model.updateOne()
    -   Model.updateMany()
    -   Model.findByIdAndUpdate()
    -   Model.findOneAndUpdate()
    -   updateOne 和 updateMany 的使用方式基本一致，只是一个只会更新第一条数据，一个会更新所有符合条件的数据。
    -   updateXXX([过滤条件],[更新数据],[配置项],[callback])

    ```js
    await Person.update(
        {
            _id: '61090d4287e3a9a69c50c842',
        },
        {
            age: 23,
        },
        {
            multi: false, // 只更新一个文档
        }
    )
    ```

-   删除
-   remove 系列的方法主要有
    -   Model.remove() 删除所有符合规则的数据
    -   Model.findOneAndRemove() 删除符合规则的第一条
    -   Model.findByIdAndDelete() 根据 ID 删除
    -   findOneAndRemove(),Model.findByIdAndDelete() 除了会删除对应的数据，还会返回查询结果。
    ```js
    const a = await Person.remove({
        _id: ObjectId('61090d4287e3a9a69c50c842'),
    })
    ```
