import { registration, login, userUpdate, updateBlocked } from './user'
import {
  communityUpdate,
  createCommunity,
  updateModerator,
  newMember
} from './community'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  updateModerator,
  updateBlocked,
  newMember
}

export type JoiValidation = keyof typeof JoiValidators
