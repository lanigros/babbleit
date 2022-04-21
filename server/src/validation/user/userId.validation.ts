import Joi from 'joi'

import { ValidUser } from './User.validation'

const userIdSchema = Joi.object({
  userId: ValidUser.userId.required()
})

export default userIdSchema
