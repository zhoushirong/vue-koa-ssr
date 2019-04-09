const Router = require('koa-router')
const controller = require('../../server/controller')
const API_LIST = require('./api-list')
const { fail, ResponseCodes } = require('../../server/controller/response')

const apiMiddleware = () => {
  const router = new Router()

  API_LIST.split(/\n/).forEach(rule => {
    const match = /(GET|POST)\s+(\S+)(\s+(\S+))?/.exec(rule)
    if (!match) return
    const [, method, path] = match
    if (method === 'GET') {
      router.get(path, getHandler)
    } else if (method === 'POST') {
      router.post(path, postHandler)
    }
  })

  return router.routes()
}

async function getHandler(ctx, next) {
  ctx.body = await controller(ctx.path, ctx.query, ctx)
  await next()
}

async function postHandler(ctx, next) {
  ctx.body = await controller(ctx.path, ctx.request.body, ctx)
  await next()
}

module.exports = apiMiddleware
