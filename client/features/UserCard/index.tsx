import { useContext } from 'react'
import { InfoCard } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { LimitedUserInfo } from '../../types'
import { UserCardWrapper } from './UserCard.styled'

export default function UserCard({ username, id, isBlocked }: LimitedUserInfo) {
  const { state } = useContext(GlobalContext)

  return (
    <UserCardWrapper>
      <InfoCard
        title={username}
        description={''}
        showImage
        allowDelete={state.user.id === id || state.user.isAdmin}
        isBlocked={isBlocked}
        allowChangeBlocked={state.user.isAdmin}
      />
    </UserCardWrapper>
  )
}
