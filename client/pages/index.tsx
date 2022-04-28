import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetCommunities, serverSideWhoAmI } from '../api'
import { GlobalContext } from '../state/globalState'
import { Community, User } from '../types'
import { CommunitiesView, LandingView } from '../views'

type HomeProps = {
  communities?: Community[]
  user?: User
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let communities: Community[] = []
  let user: User | null = null

  try {
    const communityResponse = await apiGetCommunities(ctx.req.cookies)
    const userResponse = await serverSideWhoAmI(ctx.req.cookies)
    communities = communityResponse.communities || []
    user = userResponse.user || null
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      communities,
      user
    }
  }
}

const Home = ({ user, communities }: HomeProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
    communities && dispatch({ type: 'setCommunities', payload: communities })
  }, [dispatch, user, communities])

  return (
    <main>
      {!user && <LandingView />}
      {user && <CommunitiesView />}
    </main>
  )
}

export default Home
