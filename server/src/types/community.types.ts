import { Document } from 'mongoose'

import { Id, IsBlocked, MongoId } from '.'

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
