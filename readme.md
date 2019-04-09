### 项目介绍
技术栈：koa2 + vue + vuex + vue+ssr

### 注意：
```html
本项目对生成的页面做了缓存，不能将与用户信息相关的数据进行直出，只适合对通用数据进行直出。
与用户身份信息相关的数据建议前端 ajax 异步获取。

如果一定要直出，可以去除或者修改缓存设置。
```

### 项目入口文件
```html
 ./server.js
```

### 本地启动 redis （需本地安装 redis）
```shell
cd ./mock/redis
# 1.启动sentinel服务：
redis-server sentinel-26379.conf --sentinel &;
# 2.启动redis服务：
redis-server redis-6379.conf &;
```

### 本地启动 mysql （需本地安装 mysql）
```shell
cd ./mock/mysql
mysql.server start # 启动本地数据库
mysql -u root -p # 进入数据库 自己的数据库用户名密码

source /xxx/create.sql # 执行 sql 语句创建测试表（这里需要绝对路径）
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
http://localhost:8788/page1
```

### Redis 配置

- [account_id]-query-history：类型 string，过期 1m。记录用户最近的查询时间（最近在前），用于控制查询频次，例如 "1551667945866,1551667944000"
- [account_id]-export-history：类型 string，过期 1m。记录用户最近的导出时间（最近在前），用于控制导出频次
