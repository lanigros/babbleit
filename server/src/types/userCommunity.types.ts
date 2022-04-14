import { Document } from 'mongoose'

import { Id } from '.'

export type UserCommunity = {
  userId: Id['id']
  communities: {
    communityId: Id['id']
  }[]
}

export type UserCommunityDocument = {
  _doc: UserCommunityDocument
} & Document
