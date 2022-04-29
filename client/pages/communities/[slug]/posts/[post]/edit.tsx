import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetPost, serverSideWhoAmI } from '../../../../../api'
import { GlobalContext } from '../../../../../state/globalState'
import { CommunityPost, ServerSideProps, User } from '../../../../../types'
import { EditPostView } from '../../../../../views'

type EditPostProps = {
  post: CommunityPost
  user: User
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let post: CommunityPost | null = null
  let user: ServerSideProps['user'] = null

  try {
    const postResponse = await apiGetPost(ctx.req.cookies, {
      slug: `/${ctx.params?.slug}/posts/${ctx.params?.post}`
    })

    const userResponse = await serverSideWhoAmI(ctx.req.cookies)
    user = userResponse.user || null

    post = postResponse.post
  } catch (e) {
    return {
      notFound: true
    }
  }

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
      user
    }
  }
}

const EditPost = ({ post, user }: EditPostProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
  }, [dispatch, user])

  console.log('post.userId', post.userId)
  console.log('user.id', user.id)

  return (
    <main>
      {user.id === post.userId ? (
        <EditPostView post={post} />
      ) : (
        <div>
          <h2>You do not have the privileges to edit this post</h2>
        </div>
      )}
    </main>
  )
}

export default EditPost
