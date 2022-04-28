import { useContext } from 'react'
import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import PostCard from '../PostCard'

export default function PostList() {
  const { state } = useContext(GlobalContext)

  return (
    <CardList>
      {state.posts?.length ? (
        state.posts.map((post) => <PostCard {...post} key={post.id} />)
      ) : (
        <div>No Posts Yet :(</div>
      )}
    </CardList>
  )
}
