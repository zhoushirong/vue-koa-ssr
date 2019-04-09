/**
 * redis 使用ioredis库，详细文档请参照github
 * https://github.com/luin/ioredis
 */
const Redis = require('ioredis')
const redisConfig = require('../config').redisConfig

function createConnection() {
  const client = new Redis(redisConfig)

  client.on('error', (err) => {
    global.log4js.other('redis is on error! errmsg:' + err.toString())
  })
  return client
}

module.exports = createConnection

