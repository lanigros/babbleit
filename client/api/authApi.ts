import { createFetch } from './createFetch'
import { UserLogin, UserResponse, UserSignup } from '../types'

export const apiLogin = createFetch<UserLogin, UserResponse>(
  'api/login',
  'POST'
)

export const apiLogout = createFetch<UserLogin, UserResponse>(
  'api/logout',
  'DELETE'
)

export const apiSignup = createFetch<
  Omit<UserSignup, 'repeatPassword'>,
  UserResponse
>('api/register', 'POST')
