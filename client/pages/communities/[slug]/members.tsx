import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetMembers, serverSideWhoAmI } from '../../../api'
import { GlobalContext } from '../../../state/globalState'
import {
  CommunityAdminRole,
  LimitedUserInfo,
  ServerSideProps,
  User
} from '../../../types'
import { MembersView } from '../../../views'

type MembersProps = {
  members: LimitedUserInfo[] | null
  user: User
  communityAdminRole: CommunityAdminRole
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let members: LimitedUserInfo[] | null = null
  let user: ServerSideProps['user'] = null
  let communityAdminRole: CommunityAdminRole = null

  try {
    const membersResponse = await apiGetMembers(ctx.req.cookies, {
      slug: `${ctx.params?.slug}/members`
    })
    members = membersResponse.members
    communityAdminRole = membersResponse.communityAdminRole || null

    const userResponse = await serverSideWhoAmI(ctx.req.cookies)
    user = userResponse.user || null
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      members,
      user,
      communityAdminRole
    }
  }
}

const Members = ({ user, members, communityAdminRole }: MembersProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    members && dispatch({ type: 'setUsers', payload: members })
    user && dispatch({ type: 'user', payload: user })
  }, [members, user, dispatch])

  return (
    <main>
      <MembersView communityAdminRole={communityAdminRole} />
    </main>
  )
}

export default Members
