import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect, useState } from 'react'
import { apiGetCommunity, serverSideWhoAmI } from '../../../api'
import JoinModal from '../../../features/JoinModal'
import { GlobalContext } from '../../../state/globalState'
import { CommunityAdminRole, ServerSideProps } from '../../../types'
import { CommunityView } from '../../../views'

type CommunityProps = {
  user: ServerSideProps['user']
  community: ServerSideProps['community']
  communityAdminRole: CommunityAdminRole
  isMember: boolean
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
    communityAdminRole = communityResponse.communityAdminRole || null
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
      communityAdminRole,
      isMember: !!community.members.find((member) => member.userId === user?.id)
    }
  }
}

const Community = ({
  user,
  community,
  communityAdminRole,
  isMember
}: CommunityProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
    community.posts && dispatch({ type: 'setPosts', payload: community.posts })
  }, [dispatch, user, community])

  const showMembershipPrompt = communityAdminRole
    ? !communityAdminRole
    : !isMember

  const [showModal, setShowModal] = useState(showMembershipPrompt)

  return (
    <main>
      <JoinModal showModal={showModal} setShowModal={setShowModal} />
      <CommunityView
        community={community}
        communityAdminRole={communityAdminRole}
      />
    </main>
  )
}

export default Community
