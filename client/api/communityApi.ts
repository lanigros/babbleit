import {
  CommunitiesResponse,
  CommunityRegistration,
  CommunityResponse,
  IsBlocked,
  PostCreation,
  ResponseMessage,
  MembersResponse
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

export const apiPostNewCommunity = createFetch<
  CommunityRegistration,
  CommunityResponse
>('communities', 'POST')

export const apiPostNewCommunityPost = createFetch<PostCreation, undefined>(
  `communities`,
  'POST'
)

export const apiJoinCommunity = createFetch<never, ResponseMessage>(
  'communities',
  'POST'
)

export const apiBlockCommunity = createFetch<IsBlocked, ResponseMessage>(
  'communities',
  'PUT'
)

export const apiGetMembers = createServerSideFetch<never, MembersResponse>(
  'communities',
  'GET'
)

export const apiRemoveMember = createFetch<{ userId: string }, ResponseMessage>(
  'communities',
  'DELETE'
)
