export type UserLogin = {
  email: string
  password: string
}

export type UserRegistration = {
  username: string
} & UserLogin

export type User = {
  _id: string
  isBlocked: number
  __v: number
  createdAt: string
  updatedAt: string
} & UserRegistration

export type UserDocument = {
  _doc: User
  comparePassword: (password: string) => boolean
} & Document

export type UserData = {
  id: User['_id']
  email: User['email']
  username: User['username']
  isAdmin: boolean
}

export type UserResponse = {
  user: UserData
}
