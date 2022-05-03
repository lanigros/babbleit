import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiChangePostBlocked, apiDeletePost } from '../../api/postApi'
import { InfoCard } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { CommunityPost } from '../../types'
import { PostCardWrapper } from './PostCard.styled'

type PostCardProps = {
  hasAdminPrivileges?: boolean
} & CommunityPost

export default function PostCard({
  id,
  userId,
  username,
  title,
  content,
  hasAdminPrivileges,
  isBlocked
}: PostCardProps) {
  const { state, dispatch } = useContext(GlobalContext)
  const router = useRouter()
  const isPostCreator = state.user.id === userId

  async function deletePost() {
    try {
      const response = await apiDeletePost({
        slug: `${router.query.slug}/posts/${id}`
      })
      if (response) {
        dispatch({ type: 'removePost', payload: { id } })
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  async function changeBlockedStatus() {
    try {
      const response = await apiChangePostBlocked({
        data: { isBlocked: isBlocked ? 0 : 1 },
        slug: `${router.query.slug}/posts/${id}/blocked`
      })

      if (response) {
        dispatch({
          type: 'updatePost',
          payload: {
            id,
            username,
            userId,
            title,
            content,
            isBlocked: isBlocked ? 0 : 1
          }
        })
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  return (
    <PostCardWrapper>
      <InfoCard
        title={title}
        description={content}
        showFooter
        allowDelete={hasAdminPrivileges || isPostCreator}
        allowEdit={isPostCreator}
        onDelete={deletePost}
        onEdit={() =>
          router.push(`/communities/${router.query.slug}/posts/${id}/edit`)
        }
        allowChangeBlocked={hasAdminPrivileges}
        onChangeBlocked={changeBlockedStatus}
        isBlocked={isBlocked}
      />
    </PostCardWrapper>
  )
}
