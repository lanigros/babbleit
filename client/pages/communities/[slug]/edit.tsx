import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetCommunity, serverSideWhoAmI } from '../../../api'
import { GlobalContext } from '../../../state/globalState'
import { ServerSideProps } from '../../../types'
import { EditCommunityView } from '../../../views'

type EditCommunityProps = {
  user: ServerSideProps['user']
  community: ServerSideProps['community']
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user: ServerSideProps['user'] = null
  let community: ServerSideProps['community']

  try {
    const { req, params } = ctx
    const communityResponse = await apiGetCommunity(req.cookies, {
      slug: params?.slug as string
    })

    if (!communityResponse.community) {
      return { notFound: true }
    }

    community = communityResponse.community
    const userResponse = await serverSideWhoAmI(req.cookies)
    user = userResponse.user || null
  } catch (e) {
    console.error(e)
    return { notFound: true }
  }

  return {
    props: {
      user,
      community
    }
  }
}

const EditCommunity = ({ user, community }: EditCommunityProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
    community.posts && dispatch({ type: 'setPosts', payload: community.posts })
  }, [dispatch, user, community])

  return (
    <main>
      <EditCommunityView community={community} />
    </main>
  )
}

export default EditCommunity
