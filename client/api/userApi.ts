import { UserResponse, UsersResponse } from '../types'
import { createServerSideFetch } from './createFetch'

export const serverSideWhoAmI = createServerSideFetch<never, UserResponse>(
  'users/me',
  'GET'
)

export const apiGetUsers = createServerSideFetch<never, UsersResponse>(
  'users',
  'GET'
)
