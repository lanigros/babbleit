import registration from './registration.validation'
import community from './community.validation'
import login from './login.validation'
import userUpdate from './userUpdate.validation'

export const JoiValidators = {
  registration,
  login,
  community,
  userUpdate
}

export type JoiValidation = keyof typeof JoiValidators
