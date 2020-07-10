import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000

export default {
  mongodb: {
    connection: {
      string: process.env.MONGO_CONNECTION_STRING,
    },
  },
  domain: process.env.BASE_DOMAIN || `http://localhost:${port}`,
  port,
}
