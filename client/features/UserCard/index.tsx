import { MouseEvent, useContext } from 'react'
import { apiChangeUserBlocked } from '../../api'
import { InfoCard } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { LimitedUserInfo } from '../../types'
import { UserCardWrapper } from './UserCard.styled'

type UserCardProps = {
  disableBlocking?: boolean
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
  allowDelete?: boolean
  onCustomButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void
  customButtonText?: string
} & LimitedUserInfo

export default function UserCard({
  username,
  id,
  isBlocked,
  disableBlocking,
  onDelete,
  allowDelete = false,
  onCustomButtonClick,
  customButtonText
}: UserCardProps) {
  const { state, dispatch } = useContext(GlobalContext)

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
        allowDelete={allowDelete}
        onDelete={onDelete}
        isBlocked={isBlocked}
        allowChangeBlocked={disableBlocking ? false : state.user.isAdmin}
        onChangeBlocked={changeBlockedStatus}
        onCustomButtonClick={onCustomButtonClick}
        customButtonText={customButtonText}
      />
    </UserCardWrapper>
  )
}
