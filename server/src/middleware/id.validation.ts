import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

import { BadRequest } from '../errors'

export const validateParamsId = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    req.params.userId && new Types.ObjectId(req.params.userId)
    req.params.id && new Types.ObjectId(req.params.id)
    req.params.postId && new Types.ObjectId(req.params.postId)
    next()
  } catch (e) {
    console.error(e)
    next(new BadRequest('Invalid route params'))
  }
}
