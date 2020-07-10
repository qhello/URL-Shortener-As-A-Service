import { generate as generateShortId } from 'shortid'
import { isUri } from 'valid-url'
import _ from 'lodash'

import config from '../config'
import getDb from '../db'

export default async ctx => {
  const userId = _.get(ctx.state, 'user.id')

  // Input
  const { url } = ctx.request.body

  if (!url || !isUri(url)) {
    ctx.status = 403
    ctx.body = 'A valid URL is required!'
    return
  }

  const db = await getDb()

  const search = userId ? { userId, url } : { url }

  // Let's look if URL has already been shortened
  const docInDb = await db.collection('urls').findOne(search, { _id: 1 })

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

  // If user is logged in, assign the url to his id
  if (userId) document = { userId, ...document }

  await db.collection('urls').insertOne(document)

  ctx.body = {
    shortUrl: `${config.domain}/${shortId}`,
  }
}
