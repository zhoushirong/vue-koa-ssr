/**
 * config 文件
 * 存放数据库、redis、端口等配置
 */
const env = process.env.NODE_ENV;

const hostPath = require('./hostpath')(env)
const redisConfig = require('./redis')(env)
const mysqlConfig = require('./mysql')(env)
const oracleConfig = require('./oracle')(env)
const logDirPath = require('./logpath')(env)

module.exports = {
  port: 8788,
  hostPath,
  redisConfig,
  mysqlConfig,
  logDirPath,
  oracleConfig,
}
