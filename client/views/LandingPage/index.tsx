import { MaxWidthContainer } from '../../components'
import { Login, ExploreButton } from '../../features'
import {
  BackgroundContainer,
  LandingPageTitle,
  Container,
  ExploreTitle,
  ExploreContainer
} from './landingpage.styled'
import bg from '../../public/Landing-page-background.svg'
import Image from 'next/image'
import { useContext } from 'react'
import { GlobalContext } from '../../state/globalState'

export default function LandingPage() {
  const { state } = useContext(GlobalContext)

  return (
    <>
      <BackgroundContainer>
        <Image className='background' src={bg} layout='responsive' />
      </BackgroundContainer>
      <MaxWidthContainer>
        <Container>
          <LandingPageTitle>IT</LandingPageTitle>
          <Login />
          <ExploreContainer>
            <ExploreTitle>Explore</ExploreTitle>
            <ExploreButton />
          </ExploreContainer>
        </Container>
      </MaxWidthContainer>
    </>
  )
}
