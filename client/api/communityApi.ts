import { CommunitiesResponse } from '../types'
import { createServerSideFetch } from './createFetch'

export const apiGetCommunities = createServerSideFetch<
  undefined,
  CommunitiesResponse
>('communities', 'GET')
