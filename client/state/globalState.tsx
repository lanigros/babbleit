import { createContext, useReducer } from 'react'

import { Community, User } from '../types'

const initialState = {
  user: {},
  communities: []
}

type GlobalState = {
  user: Partial<User>
  communities: Community[]
}

type SetStateAction =
  | { type: 'user'; payload: User }
  | { type: 'setCommunities'; payload: Community[] }
  | { type: 'removeCommunity'; payload: Community }

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
      let indexToRemove = state.communities.indexOf(action.payload)
      if (indexToRemove === -1) {
        indexToRemove = state.communities.length - 1
      }
      const communities = [...state.communities]
      communities.splice(indexToRemove, 1)
      return {
        ...state,
        communities
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
