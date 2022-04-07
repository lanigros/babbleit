export type StatusError = {
  status?: number
} & Error

export type User = {
  _id: string
  email: string
  password: string
  username: string
  isBlocked: number
  salt: string
}
