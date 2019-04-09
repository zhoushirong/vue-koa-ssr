const mysql = require('mysql')
const { mysqlConfig } = require('../config')

module.exports = function (db, connectCallback) {
  let config = Object.assign({}, mysqlConfig)
  if (db) {
    config = {
      host: db.host_addr,
      port: db.host_port,
      user: db.username,
      password: db.pwd,
    }
    // ddb 数据库没有数据库名 database || 所有的数据库 db_name === '*'
    if (db.db_name && db.db_name !== '*') {
      config.database = db.db_name
    }
  }
  const connection = mysql.createConnection(config)
  connection.connect((err) => {
    if (connectCallback) {
      connectCallback(err || null)
    }
  })
  connection.on('error', (err) => {
    global.log4js.other('mysql is on error! errmsg:' + err.toString())
  })
  return connection
}