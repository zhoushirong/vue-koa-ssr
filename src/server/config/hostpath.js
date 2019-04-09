/**
 * 各个环境域名 配置文件
 */

module.exports = (env) => {
  if (env === 'local' || env === 'localdev') {
    return 'http://www.epoos.com'
  }
  return 'https://www.epoos.com'
}

