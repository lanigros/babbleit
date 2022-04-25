import {
  CommunitiesResponse,
  CommunityResponse,
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

export const apiGetCommunity = createServerSideFetch<never, CommunityResponse>(
  'communities',
  'GET'
)
