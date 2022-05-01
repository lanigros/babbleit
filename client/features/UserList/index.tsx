import { MouseEvent, useContext } from 'react'
import { apiDeleteAnAccount } from '../../api'
import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import UserCard from '../UserCard'

export default function UserList() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <CardList>
      {state.users?.length ? (
        state.users.map((post) => {
          async function deleteAccount() {
            try {
              const response = await apiDeleteAnAccount({
                slug: post.id
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
              onDelete={deleteAccount}
              allowDelete={state.user.isAdmin}
            />
          )
        })
      ) : (
        <div>No Users Found :(</div>
      )}
    </CardList>
  )
}
