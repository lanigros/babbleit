import registration from './registration.validation'

export const JoiValidators = {
  registration
}

export type JoiValidation = keyof typeof JoiValidators
