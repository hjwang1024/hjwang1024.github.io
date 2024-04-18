---
order:1
---

# Linux 常用命令

## 进程

### ps -aux

-   `ps` 是`Process Status`的缩写,列出的是当前那些进程的快照
-   `a`显示所有用户的进程
-   `u`显示用户
-   `x`显示无控制终端的进程
-   字段
    1. UID：程序被该 UID 所拥有
    2. PID：就是这个程序的 ID
    3. PPID：则是其上级父程序的 ID
    4. C：CPU 使用的资源百分比
    5. STIME：系统启动时间
    6. TTY：登入者的终端机位置
    7. TIME：使用掉的 CPU 时间。
    8. CMD：所下达的是什么指令

### grep 查找命令

-   它能使用正则表达式搜索文本，并把匹配的行打印出来
-   eg: ps aux | grep python

### kill 关闭进程

-   kill PID
-   kill -KILL PID 强制杀死进程

### 查看端口使用情况

-   lsof -i
    lsof -i:8080 指定端口

## 查看日志

`tail -f *.log`

## 修改文件权限

`chmod 600 key.pem`

## 文件命令

-   回到首行 `gg`
-   删除所有内容 `dG`

## 任务挂起后台运行

-   nohup [command] &
-   `jobs` 查看后台任务
-   `kill`

## 服务器免登录 pem

1. 登录服务器 `ssh-keygen -t rsa -b 2048 -v`
2. 将私钥重命名至 id_rsa.pem：`mv ~/.ssh/id_rsa ~/.ssh/id_rsa.pem`
3. 修改~/.ssh/目录权限：`chmod 700 ~/.ssh/`
4. 将 id_rsa.pub 文件内容重定向至 authorized_keys 文件：`cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys`
5. 重启 ssh 服务：service sshd restart
6. 在本地修改`~/.ssh/config`文件，新增 host 配置
7. 新增 pem 文件，复制服务器`~/.ssh/id_rsa.pem`
8. 修改文件权限`chmod 700 ~/.ssh/`
