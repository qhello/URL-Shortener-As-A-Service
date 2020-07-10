import { generate as generateShortId } from 'shortid'
import { isUri } from 'valid-url'

import config from '../config'
import getDb from '../db'

export default async ctx => {
  // Input
  const { url } = ctx.request.body

  if (!url || !isUri(url)) {
    ctx.status = 403
    ctx.body = 'A valid URL is required!'
    return
  }

  const db = await getDb()

  // Let's look if URL has already been shortened
  const docInDb = await db.collection('urls').findOne({ url }, { _id: 1 })

  let shortId

  // Match found - let's return this directly !
  if (docInDb) {
    // eslint-disable-next-line no-underscore-dangle
    shortId = docInDb._id
  } else {
    // URL not found, let's shorten it!
    shortId = generateShortId()

    const document = {
      url,
      _id: shortId,
      createdAt: new Date(),
    }

    await db.collection('urls').insertOne(document)
  }

  ctx.body = {
    shortUrl: `${config.domain}/${shortId}`,
  }
}
