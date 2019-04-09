const createConnection = require('../store/redis')

exports.setToRedis = function setToRedis(key, value, expire) {
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

exports.getFromRedis = function (key) {
  return new Promise((resolve, reject) => {
    let client = createConnection()
    client.get(key).then((res) => {
      resolve(res)
      client.end()
    }, reject)
  })
}

exports.delFromRedis = function (key) {
  return new Promise((resolve, reject) => {
    let client = createConnection()
    client.del(key).then(() => {
      resolve(true)
      client.end()
    }, reject)
  })
}
