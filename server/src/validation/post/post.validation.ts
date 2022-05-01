import Joi from 'joi'

import { BadRequest } from '../../errors'

export const postSchema = {
  title: Joi.string()
    .regex(/^[,\. a-zA-Z0-9äöåÄÖÅ]+$/)
    .min(10)
    .max(40)
    .error(() => {
      return new BadRequest('Title must be 10 - 40 characters')
    }),
  content: Joi.string()
    .regex(/^[,\. a-zA-Z0-9äöåÄÖÅ@$!%*?\-_&]+$/)
    .min(10)
    .max(1000)
    .error(() => {
      return new BadRequest(
        'Content must be 10 - 1000 characters long and can contain the following special characters: @ $ ! % * ? - _ & Å Ä Ö'
      )
    })
}
