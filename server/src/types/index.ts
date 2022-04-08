export type StatusError = {
  status?: number
} & Error

export type UserRegistration = {
  email: string
  password: string
  username: string
}

export type User = {
  _id: string
  isBlocked: number
  salt: string
  __v: number
  createdAt: string
  updatedAt: string
} & UserRegistration

export type UserDocument = {
  _doc: User
} & Document
