import { generate as generateShortId } from 'shortid'
import { isUri } from 'valid-url'
import _ from 'lodash'

import config from '../config'
import getDb from '../db'

const generateUniqueShortId = db => {
  const shortId = generateShortId()

  const isInDb = db.collection('shortUrls').findOne({ _id: shortId })

  return isInDb ? generateUniqueShortId(db) : shortId
}

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
  const shortId = generateUniqueShortId(db)

  let document = {
    _id: shortId,
    url,
    createdAt: new Date(),
  }

  // If user is logged in, assign the url to his id
  if (userId) document = { userId, ...document }

  await db.collection('shortUrls').insertOne(document)

  ctx.body = {
    shortUrl: `${config.domain}/${shortId}`,
  }
}
