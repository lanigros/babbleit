import Redis from 'ioredis'

import { REDIS_OPTIONS } from '../configuration'

let redisClient: Redis | undefined

export function getRedis() {
  if (!redisClient) {
    redisClient = new Redis(REDIS_OPTIONS)
  }
  return redisClient
}
