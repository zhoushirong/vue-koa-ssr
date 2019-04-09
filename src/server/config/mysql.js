/**
 * mysql配置文件
 */


const config = {
  'local': {
    host: '10.216.8.142',
    port: '3306',
    database: 'epoos',
    user: 'dev',
    password: 'Abc123456!',
  },
  'pre|production': {
    host: '10.216.8.142',
    port: '3306',
    database: 'epoos',
    user: 'dev',
    password: 'Abc123456!',
  }
}

module.exports = (env) => {
  switch (env) {
    case 'local':
      return config['local']
    case 'pre':
    case 'production':
      return config['pre|production']
  }
  return config
}
