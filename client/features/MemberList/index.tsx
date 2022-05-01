import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiRemoveMember } from '../../api'
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

  return (
    <CardList>
      {state.users?.length ? (
        state.users.map((post) => {
          async function removeMember() {
            try {
              const response = await apiRemoveMember({
                slug: `${router.query.slug}/members/${post.id}`
              })
              if (response) {
                dispatch({ type: 'removeUser', payload: { id: post.id } })
              }
            } catch (e) {
              console.log('oopsie')
            }
          }

          return (
            <UserCard
              {...post}
              key={post.id}
              disableBlocking={true}
              onDelete={removeMember}
              allowDelete={state.user.isAdmin || !!communityAdminRole}
            />
          )
        })
      ) : (
        <div>No Users Found :(</div>
      )}
    </CardList>
  )
}
