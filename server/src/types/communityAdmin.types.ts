import { Community, MongoId } from '.'
import { AdminRoles } from './aggregate.types'

export type Role = {
  communityId: Community['_id']
  role: AdminRoles['admin'] | AdminRoles['moderator']
}

export type CommunityAdmin = {
  roles: Role[]
} & MongoId

export type CommunityAdminDocument = {
  _doc: CommunityAdmin
} & Document
