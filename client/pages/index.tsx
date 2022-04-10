import Login from '../features/Login'
import { MaxWidthContainer } from '../components/MaxWidthContainer'

const Home = () => {
  return (
    <main>
      <MaxWidthContainer>
        <Login />
      </MaxWidthContainer>
    </main>
  )
}

export default Home
