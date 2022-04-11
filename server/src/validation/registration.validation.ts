import Joi from 'joi'

import { ValidUser } from './User.validation'

const newUserSchema = Joi.object({
  email: ValidUser.email,
  password: ValidUser.password,
  username: ValidUser.username
})

export default newUserSchema
