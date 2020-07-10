import getDb from '../db'

export default async ctx => {
  // Input
  const shortId = ctx.params.id

  console.log(shortId)

  const db = await getDb()
  const documentInDb = await db.collection('urls').findOne({ _id: shortId })

  console.log({ documentInDb })

  if (!documentInDb) return (ctx.status = 404)

  const { url } = documentInDb

  return ctx.redirect(url)
}
