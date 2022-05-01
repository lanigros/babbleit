import { useContext } from 'react'
import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import UserCard from '../UserCard'

export default function UserList() {
  const { state } = useContext(GlobalContext)

  return (
    <CardList>
      {state.users?.length ? (
        state.users.map((post) => {
          return <UserCard {...post} key={post.id} />
        })
      ) : (
        <div>No Users Found :(</div>
      )}
    </CardList>
  )
}
