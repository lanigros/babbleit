import { registration, login, userUpdate, updateBlocked, userId } from './user'
import { communityUpdate, createCommunity, updateModerator } from './community'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  updateModerator,
  updateBlocked,
  userId
}

export type JoiValidation = keyof typeof JoiValidators
