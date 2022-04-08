import { Document } from 'mongoose'

export type StatusError = {
  status?: number
} & Error

export type UserLogin = {
  email: string
  password: string
}

export type UserRegistration = {
  username: string
} & UserLogin

export type User = {
  _id: string
  isBlocked: number
  salt: string
  __v: number
  createdAt: string
  updatedAt: string
} & UserRegistration

export type UserDocument = {
  _doc: User
  comparePassword: (password: string) => boolean
} & Document

export type Community = {
  _id: string
  title: string
  description: string
  isBlocked: number
  __v: number
}

export type CommunityDocument = {
  _doc: Community
} & Document

export type Admin = {
  _id: string
  __v: number
}

export type AdminDocument = {
  _doc: Admin
} & Document

export type CommunityRegistration = {
  title: string
  description: string
}

export type CommunityMember = {
  _id: string
  isBlocked: number
  communityId: string
  __v: number
}

export type CommunityData = {
  id: string
} & CommunityRegistration

export type CommunitySelect = {
  _id: string
} & CommunityRegistration

export type CommunityMemberDocument = {
  _doc: CommunityMember
} & Document

export type CommunityAdmin = {
  _id: string
  roles: { communityId: string; role: string }[]
}

export type CommunityAdminDocument = {
  _doc: CommunityAdmin
} & Document
