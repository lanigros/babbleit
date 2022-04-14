import { Document } from 'mongoose'

import { Id, IsBlocked, MongoId, User } from '.'

export type CommunityRegistration = {
  title: string
  description: string
}

export type CommunityMember = {
  userId: Id['id']
} & IsBlocked

export type Community = {
  __v: number
  members: CommunityMember[]
} & CommunityRegistration &
  IsBlocked &
  MongoId

export type CommunityDocument = {
  _doc: Community
} & Document

export type CommunityData = Id & CommunityRegistration

export type CommunitySelect = MongoId & CommunityRegistration

export type JoinedMember = {
  userId: Id['id']
  username: User['username']
} & IsBlocked &
  MongoId

export type CommunityMemberJoin = {
  members: JoinedMember[]
} & CommunityRegistration &
  IsBlocked &
  MongoId

export type MemberResponse = {
  isBlocked: boolean
} & Id &
  Pick<User, 'username'>

export type CommunityWithMembers = {
  isBlocked: boolean
  members: MemberResponse[]
} & CommunityRegistration
