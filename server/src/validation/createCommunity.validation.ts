import Joi from 'joi'

import { newCommunitySchema } from './community.validation'

const newCreateCommunitySchema = Joi.object({
  title: newCommunitySchema.title.required(),
  description: newCommunitySchema.description.required(),
  userId: newCommunitySchema.userId.required()
})

export default newCreateCommunitySchema
