import Joi from 'joi'

import { communitySchema } from './Community.validation'

const newMemberSchema = Joi.object({
  userId: communitySchema.userId.required()
})

export default newMemberSchema
