import { createApp } from './app.js'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      const route = router.currentRoute
      const ctx = context.ctx
      let arr = []
      if (ctx.state.sessionData) {
        arr.push(store.dispatch('user/getCurrentUser', { ctx }))
      }
      Promise.all(
        // 全局预设数据
        arr.concat(
          matchedComponents
            .filter(component => component && component.asyncData)
            .map(component => component.asyncData({ store, route, ctx }))
        )
      ).then(() => {
        context.state = store.state
        context.uType = route.meta.uType
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
