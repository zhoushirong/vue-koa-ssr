/**
 * 系统用到的常用的正则表达式
 */
const regex = {
  num: {
    reg: /^\d+$/,
    err: '参数必须为数字'
  },
  accountId: {
    reg: /^.+$/,
    err: '账号ID格式不正确'
  },
  accountName: {
    reg: /^.{1,64}$/,
    err: 'accountName格式不正确'
  },
  corpMail: {
    reg: /^.{1,64}$/,
    err: 'corp邮箱格式不正确'
  },
  sourceId: {
    reg: /^\d+$/,
    err: 'sourceId 必须为数字'
  },
  accountType: {
    reg: /^(admin|user)$/,
    err: '账号类型必须为 admin 或者 user'
  },
  id: {
    reg: /^\d+$/,
    err: 'id 必须为数字'
  },
  sourceType: {
    reg: /^(mysql|oracle|ddb)$/,
    err: '目前仅支持 mysql、oracle 和 ddb 类型的数据库'
  },
  sourceName: {
    reg: /^.{1,64}$/,
    err: 'sourceName 格式不正确'
  },
  hostAddr: {
    reg: /^.{1,64}$/,
    err: 'host address 必须为ip或者域名'
  },
  hostPort: {
    reg: /^\d{1,6}$/,
    err: '端口格式不正确'
  },
  dbName: {
    reg: /^.{1,128}$/,
    err: '数据库名称格式不正确'
  },
  username: {
    reg: /^.{1,128}$/,
    err: '用户名格式不正确'
  },
  pwd: {
    reg: /^.{1,128}$/,
    err: '密码格式不正确'
  },
  sKey: {
    reg: /^[a-zA-Z0-9_-]{1,128}$/,
    err: 'skey必须为数字、字母'
  },
  sValue: {
    reg: /^.{1,1024}$/,
    err: 'svalue格式不正确'
  },
  note: {
    reg: /^.{1,512}$/,
    err: 'note格式不正确'
  },
  logType: {
    reg: /^[a-zA-Z0-9_-]{1,32}$/,
    err: 'logType格式不对'
  },
  logSubType: {
    reg: /^[a-zA-Z0-9_-]{1,32}$/,
    err: 'logSubType格式不对'
  },
  ip: {
    reg: /^.{1,64}$/,
    err: 'ip 格式不对'
  },
  associatedId: {
    reg: /^[a-zA-Z0-9_-]{1,128}$/,
    err: 'associatedId 格式不对'
  },
  logContent: {
    reg: /^.{1,512}$/,
    err: 'logContent 格式不对'
  },
  searchValue: {
    reg: /^.{1,512}$/,
    err: '搜索内容格式不对'
  },
  date: {
    reg: /^.*$/,
    err: 'date日期格式不对'
  }
}

module.exports = regex
