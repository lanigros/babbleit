import { registration, login, userUpdate, updateBlocked } from './user'
import { communityUpdate, createCommunity, updateModerator } from './community'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  updateModerator,
  updateBlocked
}

export type JoiValidation = keyof typeof JoiValidators
