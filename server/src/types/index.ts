export * from './admin.types'
export * from './community.types'
export * from './communityAdmin.types'
export * from './user.types'
export * from './post.types'
export * from './aggregate.types'

export type StatusError = {
  status?: number
} & Error
