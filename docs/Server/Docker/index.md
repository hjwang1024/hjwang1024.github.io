## docker 常用命令

- `docker pull [image]` 拉取镜像
- `docker image ls ` 查看下载镜像
- `docker image ls -a` 显示包括中间层镜像在内的所有镜像
- `docker system df` 命令来便捷的查看镜像、容器、数据卷所占用的空间。
- `docker image rm [image ID]|[image name]` 删除镜像

- `docker run -t -i [image]` 启动容器 -d 后台运行
- `docker container ls` 查看容器信息
- `docker inspect [container-name]`
- `docker container logs [container ID or NAMES]` 获取容器的输出信息
- `docker container stop [CONTAINER ID]` 终止容器
- `docker container restart [CONTAINER ID]` 重启容器
- `docker export [CONTAINER ID] > [name].tar` 导出容器
- `docker import [url] 或  cat [name].tar | docker import - [path]/[name]:v1.0  ` 导入容器
- `docker container rm [name]` 删除容器
- `docker run -it --name=app -p 8080:8000 -v /code:/usr/src/app --link=redis:db django bash` --link=redis:db 表示把 redis 容器以 db 别名与该容器建立关系，在该容器内以 db 作为主机名表示了 redis 容器的主机地址。，v /code:/usr/src/app 表示把宿主机上的/code 目录挂载到容器内的/usr/src/app 目录，可以通过直接管理宿主机上的挂载目录来管理容器内部的挂载目录。

- `docker volume create [name]` 创建一个数据卷
- `docker volume ls ` 查看所有的数据卷
- `docker volume inspect [name]` 查看指定 数据卷 的信息
- `docker volume rm [name]` 删除数据卷
- `docker volume prune` 清除无主的数据卷

- 挂载一个主机目录作为数据卷

```
    docker run -d \
    --name web \
    -p 80:80 \
    # -v /src/webapp:/usr/share/nginx/html:ro \
    --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly \
    nginx:alpine
```

加载主机的 /src/webapp 目录到容器的 /usr/share/nginx/html 目录,readonly 指定为 只读

- `docker run -d -p 127.0.0.1:80:80 [name]` 映射本地 80 端口到容器 80 端口

- `docker network create -d bridge [net名字]` 创建一个新的 Docker 网络，-d 参数指定 Docker 网络类型，有 bridge 、overlay

- `docker run -it --rm --name busybox1 --network my-net busybox sh` 运行一个容器并连接到新建的 my-net 网络

- `docker run -it --rm --name busybox2 --network my-net busybox sh` 运行一个容器并加入到 my-net 网络

- `docker exec -i -t [image-name] bash` 进入容器

## docker-compose 模板

```shell
version: "3"
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres

```

## Dockerfile 模板

```shell
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

- `docker-compose up -d`构建和运行容器
- `docker-compose build --no-cache web` 清理缓存并重新构建 web 服务的镜像
- `docker-compose down --rmi all` 停止并移除所有容器，并删除相关的镜像
