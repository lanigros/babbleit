import Joi from 'joi'

import communitySchema from './Community.validation'

const updateModeratorSchema = Joi.object({
  userId: communitySchema.moderatorId.required()
})

export default updateModeratorSchema
