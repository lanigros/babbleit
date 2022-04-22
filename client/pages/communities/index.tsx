import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetCommunities, serverSideWhoAmI } from '../../api'
import { GlobalContext } from '../../state/globalState'
import { Community, User } from '../../types'
import { CommunitiesView } from '../../views'

type CommunitiesProps = {
  communities?: Community[]
  user?: User
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let communities: Community[] = []
  let user: User | null = null

  try {
    const communityResponse = await apiGetCommunities(ctx.req.cookies)
    communities = communityResponse.communities || []
    const userResponse = await serverSideWhoAmI(ctx.req.cookies)
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

export const Communities = ({ communities, user }: CommunitiesProps) => {
  const { dispatch } = useContext(GlobalContext)
  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
    communities && dispatch({ type: 'setCommunities', payload: communities })
  }, [dispatch, user, communities])
  return (
    <main>
      <CommunitiesView />
    </main>
  )
}

export default Communities
