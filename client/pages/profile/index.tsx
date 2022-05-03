import { GetServerSidePropsContext } from 'next'
import { serverSideWhoAmIWithPosts } from '../../api'
import { CommunityAdminRole, CommunityPost, User } from '../../types'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../state/globalState'
import { ProfileView } from '../../views'

type UserProps = {
  user: User
  posts: CommunityPost[]
  role: CommunityAdminRole
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user: User | null = null
  let posts: CommunityPost[] | null = null
  let role: CommunityAdminRole

  try {
    const userResponse = await serverSideWhoAmIWithPosts(ctx.req.cookies)
    user = userResponse.user || null
    posts = userResponse.posts || []
  } catch (e) {
    console.error(e)
  }

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user,
      posts
    }
  }
}

const Profile = ({ user, posts }: UserProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
    posts && dispatch({ type: 'setPosts', payload: posts })
  }, [dispatch, user, posts])

  return (
    <main>
      <ProfileView />
    </main>
  )
}
export default Profile
