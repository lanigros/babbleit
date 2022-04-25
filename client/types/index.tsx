export type ErrorResponse = {
  error?: string
}

export type ResponseMessage = {
  message: string
}

export type Id = { id: string }

/** USER */

export type UserLogin = {
  email: string
  password: string
}

export type UserSignup = {
  username: string
  repeatPassword: string
} & UserLogin

export type User = {
  email: string
  username: string
  isBlocked: boolean
  createdAt: string
  updatedAt: string
  isAdmin: boolean
} & Id

export type UserResponse = {
  user?: User
} & ErrorResponse

/** COMMUNITY */

export type Community = {
  title: string
  description: string
} & Id

export type CommunitiesResponse = {
  communities: Community[]
}

export type CommunityResponse = {
  community: Community
  communityAdminRole: 'admin' | 'moderator' | null
}
