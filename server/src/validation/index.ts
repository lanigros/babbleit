import { registration, login, userUpdate, updateBlocked, userId } from './user'
import { communityUpdate, createCommunity } from './community'
import { createPost } from './post'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  updateBlocked,
  userId,
  createPost
}

export type JoiValidation = keyof typeof JoiValidators
