import { MaxWidthContainer } from '../../../components'
import { CommunityList } from '../../../features'
import { Title } from './CommunitiesPage.styled'

export default function CommunitiesPage() {
  return (
    <MaxWidthContainer>
      <Title>Communities</Title>
      <CommunityList />
    </MaxWidthContainer>
  )
}
