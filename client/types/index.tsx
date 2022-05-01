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

/** POSTS */

export type PostCreation = {
  title: string
  content: string
}

export type Post = PostCreation & Id

export type CommunityPost = {
  username: User['username']
  userId: User['id']
} & Id &
  PostCreation

export type PostResponse = {
  post: CommunityPost
}

/** COMMUNITY */

type CommunityMember = {
  username: User['username']
  userId: User['id']
}

export type CommunityRegistration = {
  title: string
  description: string
}

export type Community = CommunityRegistration & Id

export type DetailedCommunity = {
  isBlocked: 1 | 0
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
