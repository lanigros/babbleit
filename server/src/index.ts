import dotenv from 'dotenv'
import connectRedis from 'connect-redis'
import session from 'express-session'

import { createApp } from './app'
import { createServer } from './server'
import { APP_PORT, MONGO_URI } from './configuration'
import { createMongoConnection, getRedis } from './db'

dotenv.config({
  path: '.env'
})

try {
  createMongoConnection(MONGO_URI)
  const RedisStore = connectRedis(session)
  const redisClient = getRedis()
  const redisStore = new RedisStore({ client: redisClient })

  const app = createApp(redisStore)
  const server = createServer(app)

  server.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
