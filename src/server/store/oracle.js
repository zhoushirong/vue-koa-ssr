const oracledb = require('oracledb')
// https://github.com/oracle/node-oracledb/blob/master/doc/api.md#propdbfetchasstring
// 对于Number类型数据，为避免精度问题导致显示不准确，按字符串处理
oracledb.fetchAsString = [ oracledb.NUMBER, oracledb.CLOB ] // CLOB 按字符串处理，注意：可能导致占用内存过多!

exports.createConnection = function(data_source) {
  const {host_addr, host_port, db_name, username, pwd} = data_source
  return new Promise((resolve, reject) => {
    oracledb.getConnection({
      user: username,
      password: pwd,
      connectString: `
      (DESCRIPTION =
        (ADDRESS =
          (PROTOCOL = TCP)
          (HOST = ${host_addr})
          (PORT = ${host_port}))
        (CONNECT_DATA =
          (SERVICE_NAME= ${db_name})))`
    }, (err, connection) => {
      if (err) {
        global.log4js.other('connect oracle data source failed:' + err.toString())
        reject(err)
        return
      }
      resolve(connection)
    })
  })
}

exports.query = function(connection, sql, maxRows) {
  if (!connection) throw new Error('require oracle connection')
  if (!sql) throw new Error('no sql')

  return new Promise((resolve, reject) => {
    let defSetting = {}
    if (maxRows) {
      defSetting.maxRows = maxRows
    }
    connection.execute(sql, [], defSetting, (err, result) => {
      releaseConnection(connection)
      if (err) return reject(err)
      resolve(result)
    })
  })
}

function releaseConnection(connection) {
  connection.close((err) => {
    if (err) global.log4js.other('release oracle connection failed:' + err.toString())
  })
}
