本地启动redis服务

1.启动sentinel服务：
```shell
redis-server sentinel-26379.conf --sentinel &;
```

2.启动redis服务：
```shell
redis-server redis-6379.conf &;
```



