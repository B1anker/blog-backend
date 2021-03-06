import path from 'path'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import logger from 'koa-logger'
import KoaStatic from 'koa-static'
import responseFormatter from '../lib/responseFormatter'

const addStatic = app => {
  app.use(KoaStatic(path.join(__dirname, '../../blog/dist')))
}

const addBodyParser = app => {
  app.use(bodyParser())
}

const addLogger = app => {
  app.use(logger())
}

const formatResponse = async app => {
  app.use(responseFormatter('^/api'))
}

const addSession = app => {
  app.keys = ['token']

  const CONFIG = {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: false /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
  }
  app.use(session(CONFIG, app))
}

export {
  addStatic,
  addBodyParser,
  addLogger,
  formatResponse,
  addSession
}
