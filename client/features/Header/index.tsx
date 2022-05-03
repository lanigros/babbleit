import Link from 'next/link'
import { useContext } from 'react'
import { GlobalContext } from '../../state/globalState'
import logo from '../../public/logo.svg'
import Image from 'next/image'

import {
  HeaderBody,
  ProfileWrapper,
  InitialLetter,
  HeaderWrapper,
  ItemsToRightWrapper
} from './Header.styled'
import Button from '../../components/Button'
import { apiLogout } from '../../api'
import Router from 'next/router'

export default function Header() {
  const { state, dispatch } = useContext(GlobalContext)
  const { user } = state
  const router = Router

  async function logoutHandler() {
    try {
      await apiLogout()
      dispatch({ type: 'user', payload: {} })
      router.push('/')
    } catch (error) {
      console.log('Opsie')
    }
  }

  return (
    <HeaderWrapper>
      <HeaderBody>
        <Link href={'/'}>
          <a>
            <Image src={logo} alt='BabbleIt logotype' width={30} height={30} />
          </a>
        </Link>
        {user.username && (
          <ItemsToRightWrapper>
            <Link href={'/profile'}>
              <a>
                <ProfileWrapper>
                  <InitialLetter>
                    {user.username?.charAt(0).toUpperCase()}
                  </InitialLetter>
                </ProfileWrapper>
              </a>
            </Link>
            <Button onClick={logoutHandler}>Logout</Button>
          </ItemsToRightWrapper>
        )}
      </HeaderBody>
    </HeaderWrapper>
  )
}
