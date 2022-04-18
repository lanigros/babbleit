import Joi from 'joi'

import { newCommunitySchema } from './Community.validation'

const newCreateCommunitySchema = Joi.object({
  title: newCommunitySchema.title.required(),
  description: newCommunitySchema.description.required()
})

export default newCreateCommunitySchema
