/**
 * redis配置文件
 */

const config = {
  'local': {
    sentinels: [{
      host: '10.242.22.138',
      port: 26379 
    }],
    password: '123456',
    name: 'mymaster'
  },
  'pre|production': {
    sentinels: [{
      host: '10.242.22.138',
      port: 26379 
    }],
    password: '123456',
    name: 'mymaster'
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
