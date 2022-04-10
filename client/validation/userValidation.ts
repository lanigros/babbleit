import { UserLogin } from '../types'

export function validatePassword({ password }: Pick<UserLogin, 'password'>) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-_&])[A-Za-z\d@$!%*?\-_&]{10,30}$/
  return passwordRegex.test(password)
}

export function validateEmail({ email }: Pick<UserLogin, 'email'>) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return emailRegex.test(email)
}

export function validateLogin({ password, email }: UserLogin) {
  const isEmailValid = validateEmail({ email })

  const invalidValues: Partial<UserLogin> = {}

  !isEmailValid && (invalidValues.email = 'Please provide a valid email')

  password.length < 1 && (invalidValues.password = 'Please provide a password')

  return invalidValues
}
