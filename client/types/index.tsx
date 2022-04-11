export type ErrorResponse = {
  error?: string
}

export type UserLogin = {
  email: string
  password: string
}

export type UserSignup = {
  username: string
  repeatPassword: string
} & UserLogin

export type User = {
  id: string
  email: string
  username: string
  isBlocked: boolean
  createdAt: string
  updatedAt: string
  isAdmin: boolean
}

export type UserResponse = {
  user?: User
} & ErrorResponse
