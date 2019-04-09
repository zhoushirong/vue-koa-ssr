const { getUser } = require('../src/server/controller/user.js')

describe('controller - source', () => {
  describe('getUser()', () => {
    it('should get results', (done) => {
      getUser(null, { cookie: 'aaaaa'}).then(result => {
        const { code, message, data } = result
        if (code !== '0000') return done(code + ' - ' + message)
        if (!data || data.length === 0) return done('用户信息应该有返回数据 ' + message)
        done()
      })
    })
  })
})