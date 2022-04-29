import { ResponseMessage } from '../types'
import { createFetch } from './createFetch'

export const apiDeletePost = createFetch<never, ResponseMessage>(
  'communities',
  'DELETE'
)
