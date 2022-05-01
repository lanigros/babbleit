import { PostCreation, ResponseMessage } from '../types'
import { createFetch } from './createFetch'

export const apiDeletePost = createFetch<never, ResponseMessage>(
  'communities',
  'DELETE'
)

export const apiUpdateCommunityPost = createFetch<
  PostCreation,
  ResponseMessage
>('communities', 'PUT')
