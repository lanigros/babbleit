import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiAddModerator, apiRemoveMember } from '../../api'
import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { CommunityAdminRole } from '../../types'
import UserCard from '../UserCard'

type MemberListProps = {
  communityAdminRole: CommunityAdminRole
}

export default function MemberList({ communityAdminRole }: MemberListProps) {
  const router = useRouter()
  const { state, dispatch } = useContext(GlobalContext)

  async function addModerator(userId: string) {
    try {
      const response = await apiAddModerator({
        slug: `${router.query.slug}/moderators`,
        data: { userId }
      })
      if (!response) {
        return
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  async function removeMember(userId: string) {
    try {
      const response = await apiRemoveMember({
        slug: `${router.query.slug}/members/${userId}`
      })
      if (response) {
        dispatch({ type: 'removeUser', payload: { id: userId } })
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  return (
    <CardList>
      {state.users?.length ? (
        state.users.map((user) => {
          return (
            <UserCard
              {...user}
              key={user.id}
              disableBlocking={true}
              onDelete={() => removeMember(user.id)}
              allowDelete={state.user.isAdmin || !!communityAdminRole}
              customButtonText={
                communityAdminRole === 'admin' ? 'Make moderator' : undefined
              }
              onCustomButtonClick={() => addModerator(user.id)}
            />
          )
        })
      ) : (
        <div>No Users Found :(</div>
      )}
    </CardList>
  )
}
