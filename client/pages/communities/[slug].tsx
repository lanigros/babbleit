import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetCommunity, serverSideWhoAmI } from '../../api'
import { GlobalContext } from '../../state/globalState'
import { CommunityAdminRole, ServerSideProps } from '../../types'
import { CommunityView } from '../../views'

type CommunityProps = {
  user: ServerSideProps['user']
  community: ServerSideProps['community']
  communityAdminRole: CommunityAdminRole
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user: ServerSideProps['user'] = null
  let community: ServerSideProps['community']
  let communityAdminRole: ServerSideProps['communityAdminRole'] = null

  try {
    const { req, params } = ctx
    const communityResponse = await apiGetCommunity(req.cookies, {
      slug: params?.slug as string
    })

    if (!communityResponse.community) {
      return { notFound: true }
    }

    community = communityResponse.community
    communityAdminRole = communityResponse.communityAdminRole
    const userResponse = await serverSideWhoAmI(req.cookies)
    user = userResponse.user || null
  } catch (e) {
    console.error(e)
    return { notFound: true }
  }

  return {
    props: {
      user,
      community,
      communityAdminRole
    }
  }
}

const Community = ({ user, community, communityAdminRole }: CommunityProps) => {
  const { dispatch } = useContext(GlobalContext)
  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
  }, [dispatch, user])
  return (
    <CommunityView
      community={community}
      communityAdminRole={communityAdminRole}
    />
  )
}

export default Community
