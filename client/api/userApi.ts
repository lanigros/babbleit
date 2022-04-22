import { UserResponse } from '../types'
import { createServerSideFetch } from './createFetch'

export const serverSideWhoAmI = createServerSideFetch<never, UserResponse>(
  'users/me',
  'GET'
)
