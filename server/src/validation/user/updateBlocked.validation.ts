import Joi from 'joi'

import { ValidUser } from './User.validation'

const updateBlockedSchema = Joi.object({
  isBlocked: ValidUser.isBlocked
})

export default updateBlockedSchema
