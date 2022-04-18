import registration from './registration.validation'
import community from './community.validation'
import login from './login.validation'
import userUpdate from './userUpdate.validation'
import blockUser from './admin.validation'
import createCommunity from './createCommunity.validation'

export const JoiValidators = {
  registration,
  login,
  community,
  createCommunity,
  userUpdate,
  blockUser
}

export type JoiValidation = keyof typeof JoiValidators
