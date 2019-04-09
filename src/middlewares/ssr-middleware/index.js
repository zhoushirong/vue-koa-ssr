const fs = require('fs')
// const LRU = require('lru-cache') // 暂时不使用
const { createBundleRenderer } = require('vue-server-renderer')
const { ResponseCodes } = require('../../server/controller/response')

let renderer = null
let readyPromise = null
let basedir = null

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    basedir: basedir,
    runInNewContext: false
  }))
}

/**
 * 渲染页面
 * @param {*} ctx 
 */
function render(ctx) {
  return new Promise((resolve, reject) => {
    const context = { 
      title: '邑司', // default title
      url: ctx.url, // 给 entry-server.js 用
      ctx
    }

    ctx.set("Content-Type", "text/html")
    renderer.renderToString(context, (err, html) => {
      if (err) {
        global.log4js.other(err, ctx)
        reject(err)
        return
      }
      if (ctx.path === '/login') {
        resolve(html)
      } else if (ctx.state.sessionData) {
        resolve(html)
      } else {
        reject({
          code: ResponseCodes.Forbidden,
          message: '获取用户信息失败'
        })
      }
    })
  })
}

function initRenderer(config) {
  if (config.isHotUpdate) {
    readyPromise = require('../../../build/setup-dev-server')(
      config.app,
      config.templatePath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options)
      }
    )
  } else {
    renderer = createRenderer(config.serverBundle, {
      template: fs.readFileSync(config.templatePath, 'utf-8'), // （可选）页面模板
      clientManifest: config.clientManifest // （可选）客户端构建 manifest
    })
  }
}

const ssrMiddleware = function (config) {
  basedir = config.basedir
  // 初始化 renderer
  initRenderer(config)
  return async (ctx, next) => {
    // 非页面请求过滤 此处根据自己的业务进行判断
    let arr = [
      '\/api\/.*', 
      '\/static\/.*',
      '\/dist\/.*',
      '\\.(js|css|jpg|png|jpeg|gif)$'
    ]
    for (let i in arr) {
      let reg = new RegExp(arr[i])
      if (reg.test(ctx.url)) {
        // 非页面路由
        await next()
        return false
      }
    }

    let body = null
    // 区分开发环境，开发环境先经过编译处理再进行 render
    if (readyPromise) {
      body = await readyPromise.then(() => {
        return render(ctx)
      })
    } else {
      body = await render(ctx)
    }
    ctx.body = body
    await next()
  }
}

module.exports = ssrMiddleware
