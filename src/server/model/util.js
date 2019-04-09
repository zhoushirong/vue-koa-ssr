exports.queryConnection = function queryConnection(connection, sql, identifiers, stayOpen) {
  return new Promise((resolve, reject) => {
    connection.query(sql, identifiers || [], (err, results) => {
      if (err) {
        reject(err)
        return
      }
      resolve(results)
    })
    if (!stayOpen) {
      connection.end()
    }
  })
}

exports.query = function (connection, sql, identifiers) {
  return new Promise((resolve) => {
    connection.query(sql, identifiers || [], (error, results, fields) => resolve({error, results, fields}))
    connection.end()
  })
}
