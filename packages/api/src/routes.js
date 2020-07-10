import Router from '@koa/router'

import getId from './controllers/getId'

import getShortUrl from './controllers/getShortUrls'
import postShortUrl from './controllers/postShortUrls'

const router = new Router()

router.get('/api/shortUrls', getShortUrl)
router.post('/api/shortUrls', postShortUrl)

// "catch all" route, used by shortened urls!
router.get('/:id', getId)

export default router
