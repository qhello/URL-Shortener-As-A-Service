import Router from '@koa/router'

import getId from './controllers/getId'
import postUrl from './controllers/postUrl'

const router = new Router()

router.post('/api/shortUrl', postUrl)

// "catch all" route, used by shortened urls!
router.get('/:id', getId)

export default router
