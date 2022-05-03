import {
  IsBlocked,
  ResponseMessage,
  UserResponse,
  UsersResponse
} from '../types'
import { createFetch, createServerSideFetch } from './createFetch'

export const serverSideWhoAmI = createServerSideFetch<never, UserResponse>(
  'users/me',
  'GET'
)

export const apiServerSideGetUsers = createServerSideFetch<
  never,
  UsersResponse
>('users', 'GET')

export const apiGetUsers = createFetch<never, UsersResponse>('users', 'GET')

export const apiDeleteAnAccount = createFetch<never, ResponseMessage>(
  'users',
  'DELETE'
)

export const apiDeleteMyAccount = createFetch<never, ResponseMessage>(
  'users/me',
  'DELETE'
)

export const apiChangeUserBlocked = createFetch<IsBlocked, ResponseMessage>(
  'users',
  'PUT'
)
export const serverSideWhoAmIWithPosts = createServerSideFetch<
  never,
  UserResponse
>('users/me?withPosts=true', 'GET')
