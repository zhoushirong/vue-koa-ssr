const Koa = require('koa')
const path = require('path')
const static = require('koa-static-prefix')
const favicon = require('koa-favicon')
const compression = require('koa-compress')
const bodyparser = require('koa-bodyparser')

const config = require('./src/server/config')
const apiMiddleware = require('./src/middlewares/api-middleware')
const sessionMiddleware = require('./src/middlewares/session-middleware')
const ssrMiddleware = require('./src/middlewares/ssr-middleware')
const loggerMiddleware = require('./src/middlewares/logger-middleware')
const jsdomMiddleware = require('./src/middlewares/jsdom-middleware')
const errMiddleware = require('./src/middlewares/err-middleware')
const isHotUpdate = process.env.NODE_ENV === 'local'
const app = new Koa()

// 定义全局变量（尽可能避免定义全局变量）
global.config = config
// 全局写日志入口 
// 如记录用户敏感操作行为，存储到数据库：global.log4js.action('content...')
// 如其它日志类型 global.log4js.other('content...')
global.log4js = loggerMiddleware.log4js 

app.use(sourceMapInterceptor)

// 日志中间件，建议是放在最前面，以便监控所有的请求
app.use(loggerMiddleware.init({
  showAccessLog: false, // 是否显示access-log
  logPath: config.logDirPath, // 日志文件位置
}))

// 错误处理页面中间件
app.use(errMiddleware())
// 热更新不压缩
if (!isHotUpdate) {
  app.use(compression())
}
// 静态资源中间件，对静态资源进行拦截，拦截到了就不往下继续执行中间件了，（阻断中间件）
if (!isHotUpdate) {
  app.use(static(path.resolve(__dirname, './dist/client'), {
    maxage: 3600000, // 毫秒
    gzip: true,
    pathPrefix:'/dist/client',
    defer: false
  }))
} else {
  app.use(static(path.resolve(__dirname, './dist/client'), {
    defer: false
  }))
}
// jsdom middleware
app.use(jsdomMiddleware())
// 请求 body 解析
app.use(bodyparser())
// 小图标
app.use(favicon(path.resolve(__dirname, 'favicon.ico')))
// 会话中间价
app.use(sessionMiddleware())
// 异步接口服务中间件，对接口 '/api/' 进行拦截
app.use(apiMiddleware())
// 服务端渲染中间件 vue ssr
app.use(ssrMiddleware({
  app,
  isHotUpdate,
  basedir: path.resolve(__dirname, './dist'),
  serverBundle: require('./dist/server/vue-ssr-server-bundle.json'),
  clientManifest: require('./dist/client/vue-ssr-client-manifest.json'),
  templatePath: path.resolve(__dirname, './src/index.html')
}))


// 暴露端口
const port = process.env.PORT || config.port
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
  if (process.platform === 'darwin') {
    // require('child_process').spawn('open', [`http://localhost:${port}/`])
  }
})

function sourceMapInterceptor(ctx, next) {
  if (/\.js\.map$/.test(ctx.path)) {
    ctx.status = 404
    return
  }
  return next()
}
