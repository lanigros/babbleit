import { createContext, useReducer } from 'react'

import { Community, CommunityPost, User, Id, LimitedUserInfo } from '../types'

const initialState = {
  user: {},
  communities: [],
  posts: [],
  users: []
}

type GlobalState = {
  user: Partial<User>
  communities: Community[]
  posts: CommunityPost[]
  users: LimitedUserInfo[]
}

type SetStateAction =
  | { type: 'user'; payload: User }
  | { type: 'setCommunities'; payload: Community[] }
  | { type: 'removeCommunity'; payload: Id }
  | { type: 'updateCommunity'; payload: Community }
  | { type: 'setPosts'; payload: CommunityPost[] }
  | { type: 'removePost'; payload: Id }
  | { type: 'updatePost'; payload: CommunityPost }
  | { type: 'setUsers'; payload: LimitedUserInfo[] }
  | { type: 'removeUser'; payload: Id }
  | { type: 'updateUserInUsers'; payload: LimitedUserInfo }

type GlobalContextType = {
  state: GlobalState
  dispatch: (action: SetStateAction) => void
}

export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null
})

const GlobalReducer = (state: GlobalState, action: SetStateAction) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: action.payload
      }

    case 'setCommunities':
      return {
        ...state,
        communities: action.payload
      }

    case 'removeCommunity':
      const communityIndex = state.communities.findIndex(
        (community) => community.id === action.payload.id
      )
      const communities = [...state.communities]
      communities.splice(communityIndex, 1)
      return {
        ...state,
        communities
      }

    case 'updateCommunity':
      const communityIndexToUpdate = state.communities.findIndex(
        (community) => community.id === action.payload.id
      )
      const updateCommunities = [...state.communities]
      updateCommunities.splice(communityIndexToUpdate, 1, action.payload)
      return {
        ...state,
        communities: updateCommunities
      }

    case 'setPosts':
      return {
        ...state,
        posts: action.payload
      }

    case 'removePost':
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      )
      const posts = [...state.posts]
      posts.splice(postIndex, 1)
      return {
        ...state,
        posts
      }

    case 'updatePost':
      const postIndexToUpdate = state.posts.findIndex(
        (post) => post.id === action.payload.id
      )
      const updatePosts = [...state.posts]
      updatePosts.splice(postIndexToUpdate, 1, action.payload)
      return {
        ...state,
        posts: updatePosts
      }

    case 'setUsers':
      return {
        ...state,
        users: action.payload
      }

    case 'removeUser':
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      )
      const users = [...state.users]
      users.splice(userIndex, 1)
      return {
        ...state,
        users
      }

    case 'updateUserInUsers':
      const userIndexToUpdate = state.users.findIndex(
        (user) => user.id === action.payload.id
      )
      const updateUsers = [...state.users]
      updateUsers.splice(userIndexToUpdate, 1, action.payload)
      return {
        ...state,
        users: updateUsers
      }

    default:
      return { ...state }
  }
}

type ContextProps = {
  children: JSX.Element[] | JSX.Element
}

export const GlobalContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer<
    (state: GlobalState, action: SetStateAction) => GlobalState
  >(GlobalReducer, {
    ...initialState
  })

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
