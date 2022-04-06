import { Request, Response, NextFunction, RequestHandler } from 'express'

import { StatusError } from '../types'

export function handleError(error: StatusError, _: Request, res: Response) {
  res
    .status(error.status || 500)
    .json({ error: error.message || 'Internal error' })
}

export function catchAsync(handler: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next)).catch(next)
  }
}
