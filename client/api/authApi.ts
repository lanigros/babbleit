import { createFetch } from './createFetch'
import { UserLogin, UserResponse, UserSignup } from '../types'

export const apiLogin = createFetch<UserLogin, UserResponse>('login', 'POST')

export const apiSignup = createFetch<
  Omit<UserSignup, 'repeatPassword'>,
  UserResponse
>('register', 'POST')