import { registration, login, userUpdate, updateBlocked, userId } from './user'
import { communityUpdate, createCommunity } from './community'
import { createPost, updatePost } from './post'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  updateBlocked,
  userId,
  createPost,
  updatePost
}

export type JoiValidation = keyof typeof JoiValidators
