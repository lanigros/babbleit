import {
  PostResponse,
  PostCreation,
  ResponseMessage,
  IsBlocked
} from '../types'
import { createFetch, createServerSideFetch } from './createFetch'

export const apiDeletePost = createFetch<never, ResponseMessage>(
  'communities',
  'DELETE'
)

export const apiUpdateCommunityPost = createFetch<
  PostCreation,
  ResponseMessage
>('communities', 'PUT')

export const apiGetPost = createServerSideFetch<never, PostResponse>(
  'communities',
  'GET'
)

export const apiChangePostBlocked = createFetch<IsBlocked, ResponseMessage>(
  'communities',
  'PUT'
)
