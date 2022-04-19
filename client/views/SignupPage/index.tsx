import { MaxWidthContainer } from '../../components'
import { Signup } from '../../features'
import { Container } from './signuppage.styled'
import bg from '../../public/Landing-page-background.svg'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <>
      <Container>
        <Image className='background' src={bg} layout='responsive' />
      </Container>
      <MaxWidthContainer>
        <Signup />
      </MaxWidthContainer>
    </>
  )
}
