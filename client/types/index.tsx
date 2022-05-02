export type ErrorResponse = {
  error?: string
}

export type ResponseMessage = {
  message: string
}

export type Id = { id: string }

export type IsBlocked = {
  isBlocked: 1 | 0
}

/** USER */

export type UserLogin = {
  email: string
  password: string
}

export type LimitedUserInfo = {
  username: string
} & Id &
  Partial<IsBlocked>

export type UserSignup = {
  username: string
  repeatPassword: string
} & UserLogin

export type User = {
  email: string
  createdAt: string
  updatedAt: string
  isAdmin: boolean
} & LimitedUserInfo

export type UserResponse = {
  user?: User
} & ErrorResponse

export type UsersResponse = {
  users: LimitedUserInfo[]
} & ErrorResponse

export type UserId = {
  userId: User['id']
}

/** POSTS */

export type PostCreation = {
  title: string
  content: string
}

export type Post = PostCreation & Id

export type CommunityPost = {
  username: User['username']
} & Id &
  PostCreation &
  IsBlocked &
  UserId

export type PostResponse = {
  post: CommunityPost
}

/** COMMUNITY */

export type CommunityMember = {
  username: User['username']
} & UserId

export type CommunityRegistration = {
  title: string
  description: string
}

export type Community = { creatorId: Id['id'] } & CommunityRegistration &
  Id &
  IsBlocked

export type MembersResponse = {
  members: LimitedUserInfo[]
  communityAdminRole: CommunityAdminRole
} & ErrorResponse

export type DetailedCommunity = {
  members: CommunityMember[]
  posts: CommunityPost[]
} & Community

export type CommunitiesResponse = {
  communities: Community[]
}

export type CommunityAdminRole = 'admin' | 'moderator' | null

export type CommunityResponse = {
  community: DetailedCommunity
  communityAdminRole: CommunityAdminRole
}

/** SERVER-SIDE PROPS */
export type ServerSideProps = {
  user: User | null
  community: DetailedCommunity
  communityAdminRole: CommunityAdminRole
}
