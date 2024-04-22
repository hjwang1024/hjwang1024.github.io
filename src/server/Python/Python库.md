# Python 库

## xlwt 库

### excel 文件写入

```py
import xlwt
# 创建一个workbook 设置编码
workbook = xlwt.Workbook(encoding = 'utf-8') #print(workbook) %结果%<xlwt.Workbook.Workbook object at 0x005F4630>
# 创建一个worksheet
worksheet = workbook.add_sheet('创建的sheet')

# 写入excel
# 参数对应 行, 列, 值
worksheet.write(1,0, label = '第二行第一列')

# 保存
workbook.save('学习笔记.xls') #运行后 会在当前目录生成一个“学习笔记.xls”
```
