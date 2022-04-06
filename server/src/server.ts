import { Express } from 'express'
import { createServer as setupServer, Server } from 'http'

export function createServer(app: Express): Server {
  return setupServer(app)
}
