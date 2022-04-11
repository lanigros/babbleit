import { createContext, useReducer } from 'react'

import { User } from '../types'

const initialState = {
  user: {}
}

type GlobalState = {
  user: Partial<User>
}

type SetStateAction = { type: 'user'; payload: User }

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
