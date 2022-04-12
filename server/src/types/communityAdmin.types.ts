export type Role = {
  communityId: string
  role: 'admin' | 'moderator'
}

export type CommunityAdmin = {
  _id: string
  roles: Role[]
}

export type CommunityAdminDocument = {
  _doc: CommunityAdmin
} & Document
