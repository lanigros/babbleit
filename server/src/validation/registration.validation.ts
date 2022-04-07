import Joi from 'joi'

const newUserSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_.-]*$/)
    .required()
})

export default newUserSchema
