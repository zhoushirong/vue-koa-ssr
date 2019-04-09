const createConnection = require('../store/mysql')
const { queryConnection, query } = require('./util')
const { test, errTest } = require('./regex')

exports.getLogs = async function (params) {
  const currentPage = Number(params.currentPage)
  const pageSize = Number(params.pageSize)
  const log_type = params.searchType
  let search_value = params.searchValue
  let starDate = params.starDate
  let endDate = params.endDate

  await test('num', currentPage)
  await test('num', pageSize)
  await test('logType', log_type)
  await errTest('searchValue', search_value)

  const conn = createConnection()
  const limit_offset = conn.escape(pageSize)
  const limit_start = conn.escape(currentPage - 1) * limit_offset

  let sql_total = `SELECT count(*) AS total FROM TB_LOG`
  let sql_page = `SELECT
    id, log_type, ip, user_id, log_content,
    DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') AS create_time
    FROM TB_LOG`
  let sql_page_order = ` order by create_time desc limit ${limit_start}, ${limit_offset}`

  let sql_where = ''
  if (
    log_type === 'log_content' ||
    log_type === 'user_id'
  ) {
    search_value = `%${search_value}%`
    sql_where = ` WHERE ${log_type} LIKE ${conn.escape(search_value)}`
  } else if (
    log_type === 'id' ||
    log_type === 'log_type' ||
    log_type === 'ip'
  ) {
    sql_where = ` WHERE ${log_type} = ${conn.escape(search_value)}`
  } else if (log_type === 'create_time') {
    await test('date', starDate)
    await test('date', endDate)
    sql_where = ` WHERE ${log_type} BETWEEN ${conn.escape(starDate)} AND ${conn.escape(endDate)}`
  } else if (log_type === 'all' && search_value) { // 注意：查询条件为空，则查全部
    search_value = conn.escape(`%${search_value}%`)
    sql_where = ` WHERE
      user_id LIKE ${search_value} OR
      log_content LIKE ${search_value} OR
      log_type LIKE ${search_value} OR
      ip LIKE ${search_value}`
  }

  const res_total = await queryConnection(conn, sql_total + sql_where, null, true)
  const res_page = await queryConnection(conn, sql_page + sql_where + sql_page_order, null, true)
  conn.end()

  return {
    extInfo: {
      total: res_total[0].total,
      currentPage,
      pageSize
    },
    list: res_page
  }
}

exports.addLogs = async function (params) {
  let { log_type, ip, user_id, log_content } = params

  let result1 = await test('logType', log_type)
  if (result1 !== true) {
    return result1
  }
  let result3 = await test('ip', ip)
  if (result3 !== true) {
    return result3
  }
  let result5 = await test('accountId', user_id)
  if (result5 !== true) {
    return result5
  }
  let result6 = await test('logContent', log_content)
  if (result6 !== true) {
    return result6
  }

  const con = createConnection()
  const sql = `insert into TB_LOG (
    log_type,
    ip,
    user_id,
    log_content
  ) values 
  (
    ${con.escape(log_type)},
    ${con.escape(ip)},
    ${con.escape(user_id)},
    ${con.escape(log_content)}
  );`
  return queryConnection(con, sql)
}

exports.queryRecentLogsByAccountAndType = async (user_id, log_type) => {
  return await query(
    createConnection(),
    'SELECT log_content FROM TB_LOG WHERE user_id = ? AND log_type = ? ORDER BY create_time DESC LIMIT 1000', // 只查最近数据
    [user_id, log_type]
  )
}
