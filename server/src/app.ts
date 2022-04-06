import express, { Request, Response, Express } from 'express'
import session, { Store } from 'express-session'

import { exampleRoutes } from './api/routes'
import { SESSION_OPTIONS } from './configuration'

export function createApp(store: Store): Express {
  const app = express()

  app.use(express.json())
  app.use(session({ ...SESSION_OPTIONS, store }))

  //TODO add api routes
  app.use('/api', exampleRoutes)

  app.use((_: Request, res: Response) => {
    res.status(404).json({ error: 'not found' })
  })

  //TODO add error handling here

  return app
}
