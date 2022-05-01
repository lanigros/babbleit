import Joi from 'joi'

import { postSchema } from './post.validation'

const updatePost = Joi.object({
  title: postSchema.title.optional(),
  content: postSchema.content.optional()
})

export default updatePost
