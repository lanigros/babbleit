import { ProfileCard } from '../features'
import { GetServerSidePropsContext } from 'next'
import { serverSideWhoAmI } from '../api'
import { User } from '../types'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../state/globalState'
import { redirect } from 'next/dist/server/api-utils'

type UserProps = {
  user: User
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user: User | null = null

  try {
    const userResponse = await serverSideWhoAmI(ctx.req.cookies)
    user = userResponse.user || null
    if (!user) {
      return {
        redirect: {
          source: '/profile',
          destination: '/',
          permanent: false
        }
      }
    }
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      user
    }
  }
}

const Profile = ({ user }: UserProps) => {
  const { dispatch } = useContext(GlobalContext)
  useEffect(() => {
    user && dispatch({ type: 'user', payload: user })
  }, [dispatch, user])

  return <ProfileCard user={user} />
}
export default Profile
