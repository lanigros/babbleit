import Joi from 'joi'

import { postSchema } from './Post.validation'

const newPost = Joi.object({
  title: postSchema.title.required(),
  content: postSchema.content.required()
})

export default newPost
