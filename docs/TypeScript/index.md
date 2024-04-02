## 函数重载
- 多种形参和返回值时，可以使参数与返回值对应
```js
function getData(id:string):DataType;
function getData(id:string[]):DataType[];
function getData(id:string | string[]): DataType | DataType[]{
    let data
    if(Array.isArraty(id)){
        return data as DataType[]
    }else{
        return data as DataType
    }
}

```
- 函数重载可以有多个重载签名，但是只允许有一个实现签名。说白了就是一个函数名只能有一个函数体。
