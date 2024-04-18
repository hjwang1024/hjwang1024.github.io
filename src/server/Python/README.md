---
order:1
---

# py 基础

## 序列化和反序列化

```py
d = {'name'：'jod'} # 字典
j = json.dumps(d)  # 转换成字符串

d = json.loads(j) #转化成字典

```

-   在 requests 库中，不用 json.loads 方法进行反序列化，而是提供了响应对象的 json 方法，用来对 json 格式的响应体进行反序列化

```py
r = requests.get(url)
r.json() # 或 r.content
```

## 列表操作

#### 列表字符转换

```py
# 使用 ','.join(list)转换为列表时
list1 = [1,2,3,4]
str = ','.join(list1)
print(str) #1,2,3,4

# 如果想输出 '1','2','3','4'
list1 = [1,2,3,4]
str = ','.join("'{0}'".format(x) for x in list1)
print(str)

# "1","2","3","4"
list1 = [1,2,3,4]
str = ','.join('"{0}"'.format(x) for x in list1)
print(str)
```

#### 列表增删

```py
list=[1,2]
# 增
list.append(3) #末尾添加单个
list.extend(list2) list = list + list2 #末尾连接列表
list.insert(2,10) #在指定序列位置插入

# 删
list.remove(2) #会删除首个匹配值，若无匹配会报错；
list.pop(index?) #可选值 若不选择 默认删除列表尾 返回值为删除值
```

#### 列表排序

```py
def myFunc(item):
    return item['key']
list.sort(reverse=True, key=myFunc)
```

#### 列表中替换元素

```py
# replace 转成字符串
aaa=['黑色','红色','白色','黑色']
aaa=str(aaa)
bbb=aaa.replace("黑色","黄色")
bbb
结果：
"['黄色', '红色', '白色', '黄色']"

# 替换单个元素
aaa=['黑色','红色','白色','黑色']
bbb=['黄色' if i =='黑色' else i for i in aaa]
bbb
结果：
['黄色', '红色', '白色', '黄色']

# 批量替换为单种元素
aaa=['黑色','红色','白色','黑色']
ccc=['黑色','红色']
bbb=['黄色' if i in ccc  else i for i in aaa]
bbb
结果：
['黄色', '黄色', '白色', '黄色']


# 批量替换为对应元素
aaa=['黑色','红色','白色','黑色']
ccc={
    '黑色':'黄色',
    '红色':'白色'
}
bbb=[ccc[i] if i in ccc else i for i in aaa]
bbb
结果：
['黄色', '白色', '白色', '黄色']


```

## dict 字典操作

#### dict 合并

```py
d1 = {
    'user':'root',
    'pwd':'1234                                                                '
}
d2 = {
    'ip':'123',
    'port':'8080'
}
# 1. d1.items()获取字典的键值对的列表  2. d1.items() + d2.items()拼成一个新的列表  3. dict(d1.items()+d2.items())将合并成的列表转变成新的字典
d3 = dict(d1.items() + d2.items)

# update 方法
d3 = {}
d3.update(d1)
d3.update(d2)
# 或
d3 = d1.copy()
d3.update(d2)

# dict方法
d3 = dict(d1,**d2)

# 遍历
d3 = {}
for k,v in d1.items():
    d3[k] = v
for k,v in d2.items():
    d3[k] = v

```

#### dict 增删改查

```py
dict = {"name": "1", "age": "2"}
# 删除
del dict["name"])

## 查
dict.get('name','nothing') # 如果键不存在，返回“Nothing”

# 增
dict.setdefault("name", "1")  # 如果键不存在，就新建该键，并赋值

# 输出键值
list(dict.items()) #[('name', '1'), ('gender', '2')]
list(dict.keys()) #['name', 'gender']
list(dict.values()) #['1', '2']
```

## 集合操作

集合是一种无序的数据存储方式，且内部元素具有唯一性。集合与字典一样都可以用花括号的形式创立。但在书写 a={} 时，Python 会将其识别为字典类型。

-   增添：add() / update()
-   删除：remove() / discard()，区别在于后者搜索无结果会报错。
-   从属：a.issubset(b) 集合 a 是否是 b 的子集；a.issuperset(b) 集合 a 是否是 b 的父集。a == b 两集合是否全等。
-   集合运算：集合运算不会改变参与运算的集合本身。
    -   并集： a | b 或者 a.union(b)
    -   交集： a & b 或者 a.intersection(b)
    -   补集： a - b 或者 a.difference(b)
-   注意：在字符串强制转换为集合时，必要时使用中括号先转为列表（否则字符串会被拆分为单个字符后再进行转换）
    ```py
    ss = {"a", "b", "c"}
    ss | set("de")
    {'a', 'b', 'c', 'd', 'e'}
    ss | set(["de"])
    {'a', 'b', 'c', 'de'}
    ```

## 函数

#### 不定参函数

-   利用序列（或元组）与字典，向函数传参。前者在传入时需要加上一个星号，后者需要两个。

```py
lst = [1, 3, 4]
d = {"a": 2, "b": 3, "c": 5}
print("{}+{}={}".format(*lst), "{a}+{b}={c}".format(**d))
1+3=4 2+3=5
```

#### zip 函数

-   zip() 函数的作用是“合并”多个列表为一个。其返回值是一个列表，列表内的元素类型是元组。如果待合并的列表长度不同，以最短的为准。

```py
a = [1,2,3]
b = [5 ,6, 7]
c = "abcd"
list(zip(a, b, c))
[(1, 5, 'a'), (2, 6, 'b'), (3, 7, 'c')]

# 交换字典的键值
d = {"a": 2, "b": 3, "c": 5}
dict(zip(d.values(), d.keys()))
{2: 'a', 3: 'b', 5: 'c'}
```

#### lambda 函数

```py
func = lambda x, y: x + y
func(2, 5)
7
```

#### map 函数

```py
lst = list(map(lambda x: x + 1, range (5)))
print(lst)
[1, 2, 3, 4, 5]
f = lambda x: x + 1
[f(x) for x in range(5)]
[1, 2, 3, 4, 5]
```

#### filter 函数

```py
list(filter(lambda x: x > 0, range(-3, 3)))
[1, 2]
```

#### reduce 函数

该函数在 Python 2 中是可以直接调用的，但在 Python 3 中需要从 functools 模块进行调用。

```py
from functools import reduce
reduce(lambda x, y: x + y, range (5))  # 0+1+2+3+4
10
```

#### enumerate 函数

```py
a = [1, 3, 5]
for index, val in enumerate(a):
    print("lst[{}] = {}".format(index, val))

lst[0] = 1
lst[1] = 3
lst[2] = 5
```

#### any 和 all 函数

-   判断列表中的元素全部满足某条件或存在某元素满足

```py
a = [1, 2, 3, 4, 5]
# 必须所有元素小于等于5
print(all(_ <= 5 for _ in a))  # True
# 或
def f1(item):
    return item<=5
print(all(f1(i) for i in a)) # True

# 存在元素等于5即可
print(any(_ == 5 for _ in a))  # True

```

## 错误处理

#### try()语句

常见的错误有以下几种：

-   ZeroDivisionError: 除数为 0.
-   SyntaxError：语法错误。
-   IndexError：索引超界。
-   KeyError：字典键不存在。
-   IOError：读写错误。

#### try 语句的常见写法：

```py
try:
    a = 1
except ZeroDivisionError as e:
    print(e)
    exit()
else:  # 如果无错误，执行 非必须
    print(a)
finally:  # 不管有无错误均执行 非必须
    print("-- End --")
1
-- End --
```

-   一个 try 语法块是可以跟着多个 except 的，如果靠前的 except 捕获了错误，之后的就不会运行

-   错误抛出`raise TypeError("Wrong type.")`

## 文件操作

#### open 函数

```py
import os

# file 包含文件名的路径（传入基于当前目录的相对路径，传入或者绝对路径）
# mode 读写操作方式
    # “r”	（默认）读。
    # “w”	写。该模式会覆盖原有内容；如文件不存在，会自动新建。
    # “x”	创建新文件并写入。
    # “a”	在已有文件的尾部追加。
# encoding 是编码类型，一般取”utf8”
open(file, mode="r", encoding=None)  # open() 函数常常配合 with 语法块进行使用

read() # 将整个文件读为一个字符串
readlines() # 将整个文件读为一个列表，文件的每一行对应列表的一个元素。

datapath = os.path.join(os.getcwd(), "data", "iris.data.csv")
with open(datapath, "r", encoding="utf8") as f:
    rawtext = f.readlines()
```

#### readline() 大文件读取

-   使用 tell() / seek() 命令，获取 / 移动“指针”的位置

```py
with open(datapath, "r", encoding="utf8") as f:
    print(f.tell(), f.readline().strip())  #读取下一行
    print(f.tell(), f.readline().strip())
    f.seek(0)  # 回到文件头
    print(f.tell(), f.readline().strip())

```

#### os 模块

```py
import os
#
# ----- 文件操作 -----
os.rename("old.py", "new.py")  # 重命名
os.remove("a.py")  # 删除
os.stat("b.py")  # 查看文件属性
#
# ----- 路径操作 -----
os.getcwd()  # 获取当前目录
os.chdir(r"d:\list")  # 更改当前目录为
os.chdir(os.pardir)  # 返回上一级目录
os.mkdir('newfolder ')  # 在当前目录新建一个文件夹
os.listdir('c:\list')  # 列出文件夹下所有文件的列表
os.removedirs('thefolder ')  # 删除空文件夹
os.path.isfile/ispath("f")  # 检查路径是文件或是目录
os.path.exists("f")  # 检查路径是否存在
#
# ----- 操作平台相关 -----
os.sep  # 当前操作系统的路径分隔符
os.linesep  # 当前操作系统的换行符
os.path.join(r"c:\abc", "d")  # 连接字串成为路径

```

## 日期操作(datetime 库)

#### 日期格式化输出

```py
from datetime import datetime
# datetime -> string
now = datetime.now()
now.strftime('%Y-%m-%d %H:%M:%S') # 2023-02-10 10:35:51.316459

# string -> datetime
time_str = '2023-02-10 10:00:00'
datetime.strptime(time_str,'%Y-%m-%d %H:%M:%S')

# 格式化控制符
%a	星期的英文单词的缩写：如星期一， 则返回 Mon
%A	星期的英文单词的全拼：如星期一，返回 Monday
%b	月份的英文单词的缩写：如一月， 则返回 Jan
%B	月份的引文单词的缩写：如一月， 则返回 January
%c	返回datetime的字符串表示，如03/08/15 23:01:26
%d	返回的是当前时间是当前月的第几天
%f	微秒的表示： 范围: [0,999999]
%H	以24小时制表示当前小时
%I	以12小时制表示当前小时
%j	返回 当天是当年的第几天 范围[001,366]
%m	返回月份 范围[0,12]
%M	返回分钟数 范围 [0,59]
%P	返回是上午还是下午–AM or PM
%S	返回秒数 范围 [0,61]。。。手册说明的
%U	返回当周是当年的第几周 以周日为第一天
%W	返回当周是当年的第几周 以周一为第一天
%w	当天在当周的天数，范围为[0, 6]，6表示星期天
%x	日期的字符串表示 ：03/08/15
%X	时间的字符串表示 ：23:22:08
%y	两个数字表示的年份 15
%Y	四个数字表示的年份 2015
%z	与utc时间的间隔 （如果是本地时间，返回空字符串）
%Z	时区名称（如果是本地时间，返回空字符串）
```

#### 日期比较操作

-   datetime 模块中有`timedelta`类

-   `datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)`

-   timedelta 类的实例，支持加、减、乘、除等操作，所得的结果也是 timedelta 类的实例

```py
from datetime import datetime,timedelta
# 计算日期相差时间
d1 = datetime.strptime('2023-03-05 17:41:20', '%Y-%m-%d %H:%M:%S')
d2 = datetime.strptime('2023-03-02 17:41:20', '%Y-%m-%d %H:%M:%S')
delta = d1 - d2
print(delta.days)  # 3

# 3天后的日期
now = datetime.now() # 今天 2023-02-10 10:48:44
day3 = now + timedelta(days=3)
print(day3.strftime('%Y-%m-%d %H:%M:%S')) # 3天后 2023-02-13 10:48:44

# 时间戳
now = datetime.now() # 今天 2023-02-10 10:48:44
timestamp = now.timestamp() # 1675997324.738674
datetime.fromtimestamp(1675997324) # 今天 2023-02-10 10:48:44
```

## 正则表达式

-   re.compile(exp)：编译正则表达式。
-   re.compile(exp).match(str)：判断正则表达式能否匹配一个字串。可以 bool() 结果来获知是否匹配。

-   re.compile(exp).match(str).groups()：将匹配结果返回为单个字符串（无子组时）或元组（有子组时）。
-   re.compile(exp).findall(str)：找出字符串中所有匹配表达式的子串。返回列表。

-   re.split(exp, str)：用表达式来分割字符串，相当于 str.split() 的增强版。

```py
import re
bool(re.match(r"\d", "1"))
True
phone_re = re.compile(r'\d{3,4}-\d{7,8}')
phone_re.match('010-12345678').group()
'010-12345678'
# 如果在正则表达式中添加了子组（小括号），那么会返回子组依顺序组成的一个元组
phone_re = re.compile(r'(\d{3,4})-(\d{7,8})')
phone_re.match('010-12345678').groups()
('010', '12345678')
phone_re = re.compile(r'\d{3,4}-\d{7,8}')  # 寻找所有子串
phone_set = '010-12345678, 021-65439876 '
phone_re.findall(phone_set)
['010-12345678', '021-65439876']
s = 'a b   c'  # 用 re.split() 处理连续的空格
print(s.split(' '), re.split(r"\s+", s))
['a', 'b', '', '', 'c'] ['a', 'b', 'c']
```
