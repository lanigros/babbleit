import Joi from 'joi'

import { BadRequest } from '../errors/BadRequest'

const newUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .error(() => {
      return new BadRequest('Invalid email format')
    }),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-_&])[A-Za-z\d@$!%*?\-_&]{10,30}$/
    )
    .error(() => {
      return new BadRequest(
        'Password must be 10 - 30 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @ $ ! % * ? - _ &'
      )
    }),
  username: Joi.string()
    .required()
    .min(5)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]*$/)
    .error(() => {
      return new BadRequest(
        'Username must be 5 - 20 characters long and may only contain letters, numbers and the following special characters: _ . -'
      )
    })
})

export default newUserSchema
