import registration from './registration.validation'
import community from './community.validation'
import login from './login.validation'
import blockUser from './admin.validation'

export const JoiValidators = {
  registration,
  login,
  community,
  blockUser
}

export type JoiValidation = keyof typeof JoiValidators
