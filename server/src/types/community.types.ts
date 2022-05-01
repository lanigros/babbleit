import { Document } from 'mongoose'

import { Id, IsBlocked, MongoId, User, Post } from '.'

export type CommunityRegistration = {
  title: string
  description: string
}

export type CommunityMember = {
  userId: User['_id']
  username: User['username']
}

export type CommunityPost = {
  postId: Post['_id']
}

type CreatorId = {
  creatorId: User['_id']
}

export type Community = {
  __v: number
  members: CommunityMember[]
  posts: CommunityPost[]
} & CommunityRegistration &
  IsBlocked &
  MongoId &
  CreatorId

export type CommunityDocument = {
  _doc: Community
} & Document

export type CommunityData = Id & CommunityRegistration & { creatorId: Id['id'] }

export type CommunitySelect = MongoId &
  CommunityRegistration &
  IsBlocked &
  CreatorId

export type MemberResponse = {
  id: Id['id']
} & Pick<User, 'username'>

export type CommunityMemberAggregate = {
  members: MemberResponse[]
}
