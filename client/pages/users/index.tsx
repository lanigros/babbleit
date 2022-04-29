import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetUsers, serverSideWhoAmI } from '../../api'
import { GlobalContext } from '../../state/globalState'
import { LimitedUserInfo, ServerSideProps, User } from '../../types'
import { UsersView } from '../../views'

type UsersProps = {
  users: LimitedUserInfo[] | null
  user: User
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let users: LimitedUserInfo[] | null = null
  let user: ServerSideProps['user'] = null

  try {
    const usersResponse = await apiGetUsers(ctx.req.cookies)
    users = usersResponse.users

    const userResponse = await serverSideWhoAmI(ctx.req.cookies)
    user = userResponse.user || null
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      users,
      user
    }
  }
}

const Users = ({ users, user }: UsersProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    users && dispatch({ type: 'setUsers', payload: users })
    user && dispatch({ type: 'user', payload: user })
  }, [dispatch, users, user])

  return (
    <main>
      <UsersView />
    </main>
  )
}

export default Users
