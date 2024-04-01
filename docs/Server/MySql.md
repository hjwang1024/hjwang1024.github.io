## Mac 安装mysql@5.7

```shell
# 1. 查看需要安装的版本
brew search mysql

# 2. 指定版本安装
brew install mysql@5.7

# 3. 如果安装遇到问题(总结), 没有遇到跳过下一步
# 执行下面2个命令. 有个前提,很多人更换了 shell. 比如我用的 Fish  要切换成 bash 在执行 不然会报错

You should change the ownership of these directories to your user.
  sudo chown -R $(whoami) /usr/local/share/man/man8

And make sure that your user has write permission.
  chmod u+w /usr/local/share/man/man8

# 4. 处理玩问题继续执行安装命令

# 5. 配置环境变量
echo 'export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile

# 6. 启动服务
mysql.server start
brew services start mysql@5.7
# 修改 mysql root 密码及相关配置
# 1. 密码强度
# 2. 移除匿名用户
# 3. 禁用 root 用户远程登录
# 4. 移除测试数据库 test
# 5. 加载以上改变

# 7. 初始化，设置密码,进行一些设置
mysql_secure_installation
```

## 连接 join

- Inner Join 内连接： 相当于 A and B，代表两个集合(表)的交集，即表中某字段匹配上的条目。
- Full Outer Join 全连接：相当于 A or B`，代表两个表的并集，即两表合并所有字段和数据为一个表，未匹配的数据中的空字段以 null 填充。
- Right Join 右连接：使用 left 表里所有数据，而 right 表中只保留匹配数据，且未匹配数据条目中的 right 表字段以 null 填充。
- Left Join 左连接：使用 right 表里所有数据，而 left 表中只保留匹配数据，且未匹配数据条目中的 left 表字段以 null 填充。
  ![join](./mysql%20join.png)

## 语句

#### 添加表字段

`ALTER TABLE adset_watch_record_v2 ADD COLUMN pred_res_7day VARCHAR(255) DEFAULT NULL COMMENT '七天是否回本' AFTER old_column`

- table_name ：表明；
- column_name：需要添加的字段名；
- VARCHAR(100)：字段类型为 varchar，长度 100；
- DEFAULT NULL：默认值 NULL；
- AFTER old_column：新增字段添加在 old_column 字段后面。

#### 复制相同列

`update article set B=A`

#### 删除字段

`ALTER TABLE adset_watch_record_v2 DROP pred_res_7day`

## [数据库表导入导出](https://www.cnblogs.com/chenmh/p/5300370.html)

#### 导出

`mysqldump -h<host> -u<user> -p<passport> -P3306 --databases hamburger --skip-lock-tables --tables <表名> --where='<筛选语句>' --set-gtid-purged=OFF --column-statistics=0 --no-tablespaces -t> adset_watch.sql`

- -t 表示只导入数据，不到入表结构
- > 后边接导出的文件名

#### 导入

`mysql -h<host> -u<user> -p<passport> -P3306 <表名> < adset_watch.sql`
