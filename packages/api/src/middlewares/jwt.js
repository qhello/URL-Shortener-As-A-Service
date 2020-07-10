import jwt from 'jsonwebtoken'

import config from '../config'

export default async (ctx, next) => {
  const authHeader = ctx.headers.authorization

  if (!authHeader) {
    return next()
  }

  const [type, token] = authHeader.split(' ')

  if (type.toLowerCase() !== 'bearer') {
    ctx.status = 401
    ctx.body = 'Only Bearer token is accepted as authorization'
    return null
  }

  let payload

  // Check that JWT is valid
  try {
    payload = jwt.verify(token, config.hmac.key)
  } catch (error) {
    console.error('[JWT error]', error)

    ctx.status = 401
    ctx.body = 'Invalid JWT'
    return null
  }

  // Inserting user data in context, to be reused if needed in controllers
  ctx.state.user = {
    id: payload.sub,
    name: payload.name,
  }

  return next()
}
