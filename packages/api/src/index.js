import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

import config from './config'

import getId from './controllers/getId'
import postUrl from './controllers/postUrl'

const app = new Koa()
const router = new Router()

router.post('/api/shortUrl', postUrl)

// "catch all" route, used by shortened urls!
router.get('/:id', getId)

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port)

console.log("Service 'launcher' started!")
