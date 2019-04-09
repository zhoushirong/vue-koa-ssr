/**
 * 日志上报系统
 */
const log4js = require('log4js')
const path = require('path')

/**
 * 三种日志类型
 * access日志
 * 服务端日志
 * 其它日志
 */
module.exports = (config) => {
  /**
   * log4js 配置
   */
  // const logPath = path.join(__dirname, '../../../log4logs/epoos/log')
  /**
   * 两个配置 使用其中一个就好了
   * disableClustering:true (默认false) 为true的时候不使用log4js的集群模式，所有进程都写日志到日志文件
   * pm2:true (默认false) 为true的时候使用pm2的集群模式，需要安装pm2-intercom（pm2 install pm2-intercom）
   * pm2InstanceVar 对应 pm2 进程id变量，默认为'NODE_APP_INSTANCE', pm2 中可配置，所以这里也可以配置；当这个变量为0的时候为主进程
   */
  let logPath = config.logPath

  log4js.configure({
    disableClustering: true,
    // pm2: true,
    // appenders 指定日志往哪里输出
    appenders: {
      access: {
        type: 'dateFile',
        filename: path.join(logPath, 'access.log'),
        pattern: '.yyyy-MM-dd',
        compress: true
      },
      other: {
        type: 'dateFile',
        filename: path.join(logPath, 'other.log'),
        pattern: '.yyyy-MM-dd',
        compress: true
      }
    },
    // 日志类型
    categories: {
      default: {
        appenders: ['other'],
        level: 'info'
      },
      access: {
        appenders: ['access'],
        level: 'info'
      }
    },
  })

  return {
    access: log4js.getLogger('access'),
    other: log4js.getLogger('other')
  }
}
