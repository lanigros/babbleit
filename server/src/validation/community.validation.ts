import Joi from 'joi'

import { BadRequest } from '../errors/BadRequest'

const newCommunitySchema = Joi.object({
  title: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .error(() => {
      return new BadRequest(
        'Title must be 3-20 characters long and only contain alphanumeric characters'
      )
    }),
  description: Joi.string()
    .min(5)
    .max(50)
    .error(() => {
      return new BadRequest('Description must be 5-30 characters long')
    })
})

export default newCommunitySchema
