import Joi from 'joi'

import { ValidUser } from './User.validation'

const loginSchema = Joi.object({
  email: ValidUser.email,
  password: ValidUser.password
})

export default loginSchema
