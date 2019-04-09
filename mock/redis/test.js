/**
 * redis 使用ioredis库，详细文档请参照github
 * https://github.com/luin/ioredis
 */
const Redis = require('ioredis')

let redisConfig = {
  sentinels: [{
    host: '10.242.22.138',
    port: 26379
  }],
  password: '123456',
  name: 'mymaster'
}

function createConnection() {
  const client = new Redis(redisConfig)
  client.on('error', (err) => {
    console.error('redis is on error! errmsg:' + err.toString())
  })
  return client
}

function setToRedis(key, value, expire) {
  if (arguments.length === 1 && typeof key === 'object') {
    const params = key
    key = params.key
    value = params.value
    expire = params.expire
  }
  return new Promise((resolve, reject) => {
    let client = createConnection()
    client.set(key, value).then((res) => {
      resolve(true)
      client.end()
    }, reject)
    client.expire(key, expire || 24*3600) // 过期时间默认1天
  })
}

function getFromRedis(key) {
  return new Promise((resolve, reject) => {
    let client = createConnection()
    client.get(key).then((res) => {
      resolve(res)
      client.end()
    }, reject)
  })
}

setToRedis('abcdefg3', 'redis-value 1234567')

getFromRedis('abcdefg').then(res => {
  console.log('get redis:', res)
})
