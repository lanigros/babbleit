import { Document } from 'mongoose'

import { Id, IsBlocked, MongoId, User, Post, CommunityPost } from '.'

export type CommunityBase = {
  title: string
  description: string
}

export type EditBaseCommunity = CommunityBase & Id

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
} & CommunityBase &
  IsBlocked &
  MongoId &
  CreatorId

export type CommunityDocument = {
  _doc: Community
} & Document

export type CommunityData = Id & CommunityBase & { creatorId: Id['id'] }

export type CommunitySelect = MongoId & CommunityBase & IsBlocked & CreatorId

export type JoinedMember = {
  userId: User['_id']
  username: User['username']
} & IsBlocked &
  MongoId

export type MemberResponse = {
  id: Id['id']
} & Pick<User, 'username'>

export type CommunityMemberAggregate = {
  members: MemberResponse[]
} & CommunityBase &
  Id
