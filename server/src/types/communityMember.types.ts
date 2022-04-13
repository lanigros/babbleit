export type CommunityMember = {
  _id: string
  isBlocked: number
  communityId: string
  __v: number
}

export type CommunityMemberDocument = {
  _doc: CommunityMember
} & Document
