import { useContext } from 'react'
import { apiChangeUserBlocked, apiDeleteAnAccount } from '../../api'
import { InfoCard } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { LimitedUserInfo } from '../../types'
import { UserCardWrapper } from './UserCard.styled'

export default function UserCard({ username, id, isBlocked }: LimitedUserInfo) {
  const { state, dispatch } = useContext(GlobalContext)

  async function deleteAccount() {
    try {
      const response = await apiDeleteAnAccount({
        slug: id
      })
      if (response) {
        dispatch({ type: 'removeUser', payload: { id } })
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  async function changeBlockedStatus() {
    try {
      const response = await apiChangeUserBlocked({
        data: { isBlocked: isBlocked ? 0 : 1 },
        slug: id
      })
      if (response) {
        dispatch({
          type: 'updateUserInUsers',
          payload: { username, id, isBlocked: isBlocked ? 0 : 1 }
        })
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  return (
    <UserCardWrapper>
      <InfoCard
        title={username}
        description={''}
        showImage
        allowDelete={state.user.isAdmin}
        onDelete={deleteAccount}
        isBlocked={isBlocked}
        allowChangeBlocked={state.user.isAdmin}
        onChangeBlocked={changeBlockedStatus}
      />
    </UserCardWrapper>
  )
}
