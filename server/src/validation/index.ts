import { registration, login, userUpdate, updateBlocked, userId } from './user'
import { communityUpdate, createCommunity } from './community'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  updateBlocked,
  userId
}

export type JoiValidation = keyof typeof JoiValidators
