import Joi from 'joi'

import { newCommunitySchema } from './Community.validation'

const newCreateCommunitySchema = Joi.object({
  title: newCommunitySchema.title.optional(),
  description: newCommunitySchema.description.optional()
})

export default newCreateCommunitySchema
