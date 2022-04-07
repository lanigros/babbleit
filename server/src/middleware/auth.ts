import { NextFunction, Request, Response } from 'express'

import { Unauthorized } from '../errors/Unauthorized'

export function allowOnlyGuests(req: Request, _: Response, next: NextFunction) {
  console.log(req.body)
  if (req.session.userId) {
    next(new Unauthorized('Only guests allowed'))
  }

  next()
}
