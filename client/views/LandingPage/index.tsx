import { MaxWidthContainer } from '../../components'
import { Login, ExploreButton } from '../../features'
import { Container } from './landingpage.styled'
import bg from '../../public/Landing-page-background.svg'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <>
      <Container>
        <Image className='background' src={bg} layout='responsive' />
      </Container>
      <MaxWidthContainer>
        <Login />
        <ExploreButton />
      </MaxWidthContainer>
    </>
  )
}
