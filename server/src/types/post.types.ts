import { Community } from '.'
import { Id, IsBlocked, MongoId } from './aggregate.types'
import { User } from './user.types'

export type Post = {
  userId: User['_id']
  username: User['username']
  communityId: Community['_id']
  title: string
  content: string
  __v: number
} & MongoId &
  IsBlocked

export type PostDocument = {
  _doc: Post
} & Document

export type PostRegistration = {
  title: string
  content: string
}

export type PostUsername = {
  username: Post['username']
} & Id &
  PostRegistration
