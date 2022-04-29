import { createContext, useReducer } from 'react'

import { Community, CommunityPost, User, Id } from '../types'

const initialState = {
  user: {},
  communities: [],
  posts: []
}

type GlobalState = {
  user: Partial<User>
  communities: Community[]
  posts: CommunityPost[]
}

type SetStateAction =
  | { type: 'user'; payload: User }
  | { type: 'setCommunities'; payload: Community[] }
  | { type: 'removeCommunity'; payload: Id }
  | { type: 'updateCommunity'; payload: Community }
  | { type: 'setPosts'; payload: CommunityPost[] }
  | { type: 'removePost'; payload: Id }
  | { type: 'updatePost'; payload: CommunityPost }

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
        (post) => post.id === action.payload.id
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
