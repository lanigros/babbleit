export type CommunityRegistration = {
  title: string
  description: string
}

export type Community = {
  _id: string
  isBlocked: number
  __v: number
} & CommunityRegistration

export type CommunityDocument = {
  _doc: Community
} & Document

export type CommunityData = {
  id: string
} & CommunityRegistration

export type CommunitySelect = {
  _id: string
} & CommunityRegistration
