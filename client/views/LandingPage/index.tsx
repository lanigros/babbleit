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

export default function LandingPage() {
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
