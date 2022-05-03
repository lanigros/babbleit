import { MaxWidthContainer } from '../../components'
import { SignupOrUpdate as Signup } from '../../features'
import {
  Container,
  BackgroundContainer,
  LandingPageTitle
} from './signuppage.styled'
import bg from '../../public/Landing-page-background.svg'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <>
      <BackgroundContainer>
        <Image className='background' src={bg} layout='responsive' />
      </BackgroundContainer>
      <MaxWidthContainer>
        <Container>
          <LandingPageTitle>IT</LandingPageTitle>
          <Signup />
        </Container>
      </MaxWidthContainer>
    </>
  )
}
