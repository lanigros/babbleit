import { NextFunction, Request, Response } from 'express'

import { Unauthorized } from '../errors/Unauthorized'

export function allowOnlyGuests(req: Request, _: Response, next: NextFunction) {
  if (req.session.userId) {
    next(new Unauthorized('Only guests allowed'))
  }

  next()
}

export function allowOnlyRegisteredUsers(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    next(new Unauthorized('You need to be a registered user'))
  }
  next()
}
