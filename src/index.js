import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import config from './config'
import router from './routes'

import jwtMiddleware from './middlewares/jwt'

const app = new Koa()

// JWT middleware
app.use(jwtMiddleware)

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port)

console.log(`Service 'api' launched! 🚀`)
console.log(`Listening on port ${config.port}...`)
