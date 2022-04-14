import { Id, MongoId } from '.'

export type Admin = {
  userId: Id['id']
  __v: number
} & MongoId

export type AdminDocument = {
  _doc: Admin
} & Document
