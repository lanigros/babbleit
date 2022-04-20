import { registration, login, userUpdate, blockUser } from './user'
import { communityUpdate, createCommunity, updateModerator } from './community'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  blockUser,
  updateModerator
}

export type JoiValidation = keyof typeof JoiValidators
