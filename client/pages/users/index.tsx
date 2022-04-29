import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'
import { apiGetUsers } from '../../api'
import UserList from '../../features/UserList'
import { GlobalContext } from '../../state/globalState'
import { LimitedUserInfo } from '../../types'
import { UsersView } from '../../views'

type UsersProps = {
  users: LimitedUserInfo[] | null
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let users: LimitedUserInfo[] | null = null

  try {
    const userResponse = await apiGetUsers(ctx.req.cookies)
    users = userResponse.users
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      users
    }
  }
}

const Users = ({ users }: UsersProps) => {
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    users && dispatch({ type: 'setUsers', payload: users })
  }, [dispatch, users])

  return (
    <main>
      <UsersView />
    </main>
  )
}

export default Users
