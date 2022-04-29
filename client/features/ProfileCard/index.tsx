import { useContext } from 'react'
import { GlobalContext } from '../../state/globalState'
import {
  Card,
  ProfilePicture,
  ProfileText,
  CardLower,
  CardUpper
} from './ProfileCard.styled'

export default function ProfileCard() {
  const { state } = useContext(GlobalContext)
  return (
    <Card>
      <CardUpper>
        <ProfilePicture />
      </CardUpper>
      <CardLower>
        <ProfileText>
          <h5>{state.user.email}</h5>
          <p>{state.user.username}</p>
        </ProfileText>
      </CardLower>
    </Card>
  )
}
