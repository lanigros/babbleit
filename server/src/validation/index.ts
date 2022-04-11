import registration from './registration.validation'
import community from './community.validation'
import login from './login.validation'

export const JoiValidators = {
  registration,
  login,
  community
}

export type JoiValidation = keyof typeof JoiValidators
