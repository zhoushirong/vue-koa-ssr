/**
 * 数据源相关
 */
const createConnection = require('../store/mysql')
const { query } = require('./util')

function getUserByUserId(user_id) {
  if (!user_id) {
    throw 'user_id is not null'
  }
  const sql = `SELECT
    user_id, user_name, user_type, user_status,
    DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') as create_time,
    DATE_FORMAT(update_time,'%Y-%m-%d %H:%i:%s') as update_time
  FROM TB_USER where user_id=?`

  return query(
    createConnection(),
    sql,
    [user_id]
  )
}

/**
 * 获取完整的用户信息（包括密码）
 * @param {*} user_id 
 */
function getWholUserByUserId(user_id) {
  if (!user_id) {
    throw 'user_id is not null'
  }
  const sql = `SELECT
    user_id, user_name, password, user_type, user_status,
    DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') as create_time,
    DATE_FORMAT(update_time,'%Y-%m-%d %H:%i:%s') as update_time
  FROM TB_USER where user_id=?`

  return query(
    createConnection(),
    sql,
    [user_id]
  )
}
module.exports = {
  getUserByUserId,
  getWholUserByUserId
}
