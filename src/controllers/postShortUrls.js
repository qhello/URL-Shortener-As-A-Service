import { generate as generateShortId } from 'shortid'
import { isUri } from 'valid-url'
import _ from 'lodash'

import config from '../config'
import getDb from '../db'

export default async ctx => {
  const userId = _.get(ctx.state, 'user.id')

  // Input
  const { url } = ctx.request.body

  // TODO: Support "expiresIn" parameter!

  if (!url || !isUri(url)) {
    ctx.status = 403
    ctx.body = 'A valid URL is required!'
    return
  }

  const db = await getDb()

  const search = userId ? { url, userId } : { url, userId: { $exists: false } }

  // Let's look if URL has already been shortened
  const docInDb = await db.collection('shortUrls').findOne(search, { _id: 1 })

  // Match found - let's return this directly !
  if (docInDb) {
    const { _id: shortId } = docInDb

    ctx.body = {
      shortUrl: `${config.domain}/${shortId}`,
    }

    return
  }

  // URL not found, let's shorten it!
  const shortId = generateShortId()

  let document = {
    url,
    _id: shortId,
    createdAt: new Date(),
  }

  // TODO: Check that shortId isn't already present in DB!

  // If user is logged in, assign the url to his id
  if (userId) document = { userId, ...document }

  await db.collection('shortUrls').insertOne(document)

  ctx.body = {
    shortUrl: `${config.domain}/${shortId}`,
  }
}
