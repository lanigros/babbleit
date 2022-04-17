import {
  CommunitiesResponse,
  Community,
  CommunityCreation,
  CommunityResponse,
  PostCreation,
  ResponseMessage
} from '../types'
import { createFetch, createServerSideFetch } from './createFetch'

export const apiGetCommunities = createServerSideFetch<
  never,
  CommunitiesResponse
>('communities', 'GET')

export const apiRemoveCommunity = createFetch<never, ResponseMessage>(
  'communities',
  'DELETE'
)

export const apiPostNewCommunity = createFetch<
  CommunityCreation,
  CommunityResponse
>('communities', 'POST')

export const apiPostNewCommunityPost = createFetch<PostCreation, undefined>(
  `communities`,
  'POST'
)
