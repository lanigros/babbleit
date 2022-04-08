import registration from './registration.validation'
import community from './community.validation'

export const JoiValidators = {
  registration,
  community
}

export type JoiValidation = keyof typeof JoiValidators
