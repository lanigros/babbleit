import { UserLogin, UserSignup } from '../types'

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

export function validateUsername({ username }: Pick<UserSignup, 'username'>) {
  const usernameRegex = /^[a-zA-Z0-9_.-]*$/

  return (
    usernameRegex.test(username) &&
    username.length >= 5 &&
    username.length <= 20
  )
}

export function validateLogin({ password, email }: UserLogin) {
  const isEmailValid = validateEmail({ email })

  const invalidValues: Partial<UserLogin> = {}

  !isEmailValid && (invalidValues.email = 'Please provide a valid email')

  password.length < 1 && (invalidValues.password = 'Please provide a password')

  return invalidValues
}

export function validateSignup({
  email,
  username,
  password,
  repeatPassword
}: UserSignup) {
  const isEmailValid = validateEmail({ email })
  const isUsernameValid = validateUsername({ username })
  const isPasswordValid = validatePassword({ password })
  const isPasswordMatching = password === repeatPassword

  const invalidValues: Partial<UserSignup> = {}

  !isEmailValid && (invalidValues.email = 'Invalid email')
  !isUsernameValid &&
    (invalidValues.username =
      'Username may only be 5-20 characters and contain letters, numbers and special characters ( _ . -)')
  !isPasswordValid &&
    (invalidValues.password =
      'Password must be 10-30 characters and include both uppercase and lowercase letters, a number and a special character (@ $ ! % * ? - _ &)')
  !isPasswordMatching &&
    (invalidValues.repeatPassword = `Passwords don't match`)

  return invalidValues
}
