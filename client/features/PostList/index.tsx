import { useContext } from 'react'
import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import PostCard from '../PostCard'

type PostListProps = {
  isCommunityAdmin?: boolean
}

export default function PostList({ isCommunityAdmin }: PostListProps) {
  const { state } = useContext(GlobalContext)

  return (
    <CardList>
      {state.posts?.length ? (
        state.posts.map((post) => {
          return (
            <PostCard
              {...post}
              key={post.id}
              hasAdminPrivileges={state.user.isAdmin || isCommunityAdmin}
            />
          )
        })
      ) : (
        <div>No Posts Yet :(</div>
      )}
    </CardList>
  )
}
