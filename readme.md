### 项目介绍
技术栈：koa2 + vue + vuex + ssr + mysql + redis + webpack4 + elementUI

### 注意：

1.本项目未配置缓存，如果是线上使用建议配置环境。
2.项目依赖 mysql 和 redis，配置文件如下：
```html
src/server/config/redis.js
src/server/config/mysql.js
```
3.日志使用的是log4js,如果使用pm2启动多个进程，需要在服务器安装 pm2-intercom，否则可能会丢失日志
```shell
pm2 install pm2-intercom
# 将此文件 src/middlewares/logger-middleware/category.js
# 修改 disableClustering:true 为 pm2: true
```
### 项目入口文件
```html
 ./server.js
```

### 本地启动 redis （需本地安装 redis）
```shell
cd ./mock/redis
# 1.启动redis服务：
redis-server redis-6379.conf &;
# 2.启动sentinel服务：
redis-server sentinel-26379.conf --sentinel &;
```

### mysql 表创建
```shell
source ./mock/mysql/create.sql # 执行 sql 语句创建测试表（这里需要绝对路径）
```

 ### 项目启动
 ```shell
 npm install
 npm run build # 首次运行 dev 环境先 build
 npm run dev # 开发环境 普通启动方式
 pm2 start ./server.js # 开发环境 PM2 启动方式
 
 npm run build;npm start # 生产环境
 ```

 ### 访问
```html
http://localhost:8788
```
