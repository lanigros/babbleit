const { REDIS_PORT = 6379, REDIS_HOST = 'localhost' } = process.env

export const REDIS_OPTIONS = {
  port: Number(REDIS_PORT),
  host: REDIS_HOST
}
