import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors/BadRequest'
import { JoiValidation, JoiValidators } from '../validation'

export function validateRequest(validatorName: JoiValidation) {
  return async function (req: Request, _: Response, next: NextFunction) {
    try {
      const validatedRequestBody = await JoiValidators[
        validatorName
      ].validateAsync(req.body)
      req.body = validatedRequestBody
      next()
    } catch (error) {
      next(new BadRequest('BAD'))
    }
  }
}
