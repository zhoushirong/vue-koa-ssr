/**
 * JSDOM middleware
 * 解决 ssr 中 document 不存在的问题
 */
const hostPath = require('../../server/config').hostPath
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;

module.exports = () => {
  return async (ctx, next) => {
    global.dom = new JSDOM('<!doctype html><html><body></body></html>', {
      url: hostPath,
      resources: 'usable'
    });
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = global.window.navigator;

    await next()
  }
}
