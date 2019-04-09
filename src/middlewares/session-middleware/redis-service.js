const { getFromRedis, setToRedis, delFromRedis } = require('../../server/model/redis')

const REDIS_EXPIRES_TIME = 3600
const REDIS_SESSION_PRFIX = 'epoos_session'

class SessionRedisService {
  constructor(id, expire) {
    this._prefix = REDIS_SESSION_PRFIX + '_' + id + '_'
    this._expire = expire || REDIS_EXPIRES_TIME
  }
  async get(session_id) {
    const data = await getFromRedis(this._prefix + session_id)
    if (data) return JSON.parse(data)
    return null
  }
  async set(session_id, data) {
    return await setToRedis(this._prefix + session_id, JSON.stringify(data), this._expire)
  }
  async clear(session_id) {
    return await delFromRedis(this._prefix + session_id)
  }
}

exports.UserInfoRedisService = new SessionRedisService('userinfo')
