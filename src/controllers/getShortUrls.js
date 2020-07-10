import _ from 'lodash'

import config from '../config'
import getDb from '../db'

export default async ctx => {
  const userId = _.get(ctx.state, 'user.id')

  const db = await getDb()

  const search = userId ? { userId } : { userId: { $exists: false } }

  // Find last 5 shortUrls, public or user-specific
  const shortUrls = await db
    .collection('shortUrls')
    .find(search, { fields: { url: 1, createdAt: 1, expiresAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray()

  ctx.body = shortUrls.map(({ _id: shortId, ...document }) => ({
    shortUrl: `${config.domain}/${shortId}`,
    ...document,
  }))
}
