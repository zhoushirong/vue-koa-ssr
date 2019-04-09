/**
 * 日志路径配置文件
 */
let path = require('path')

module.exports = (env) => {
  if (env === 'pre' || env === 'production') {
    return '/data/epoos/log'
  }
  return path.join(__dirname, '../../../log4logs')
}
