import getDb from '../db'

export default async ctx => {
  // Input
  const shortId = ctx.params.id

  const db = await getDb()
  const documentInDb = await db.collection('shortUrls').findOne({ _id: shortId })

  if (!documentInDb) return (ctx.status = 404)

  const { url } = documentInDb

  return ctx.redirect(url)
}
