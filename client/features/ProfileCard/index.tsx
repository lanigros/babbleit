import { User } from '../../types'
import {
  Card,
  ProfilePicture,
  ProfileText,
  CardLower,
  CardUpper
} from './ProfileCard.styled'

type ProfileCardProps = {
  user: User
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardUpper>
        <ProfilePicture />
      </CardUpper>
      <CardLower>
        <ProfileText>
          <h5>{user.username}</h5>
          <p>{user.email}</p>
        </ProfileText>
      </CardLower>
    </Card>
  )
}
