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
  NotLoggedInTxt
} from './Header.styled'

export default function Header() {
  const { state, dispatch } = useContext(GlobalContext)
  const { user } = state

  return (
    <HeaderWrapper>
      <HeaderBody>
        <Link href={'/'}>
          <a>
            <Image src={logo} alt='BabbleIt logotype' width={30} height={30} />
          </a>
        </Link>
        <Link href={'/profile'}>
          <a>
            {user.username && (
              <ProfileWrapper>
                <InitialLetter>
                  {user.username?.charAt(0).toUpperCase()}
                </InitialLetter>
              </ProfileWrapper>
            )}
          </a>
        </Link>
      </HeaderBody>
    </HeaderWrapper>
  )
}
