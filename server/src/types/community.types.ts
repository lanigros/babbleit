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

export type JoinedMember = {
  userId: User['_id']
  username: User['username']
} & IsBlocked &
  MongoId

export type MemberResponse = {
  isBlocked: boolean
} & Id &
  Pick<User, 'username'>

export type CommunityAggregate = {
  members: MemberResponse[]
} & CommunityRegistration &
  Id
