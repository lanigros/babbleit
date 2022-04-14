import { MaxWidthContainer } from '../../../components'
import { CommunityList } from '../../../features'
import { Community } from '../../../types'
import { Title } from './CommunitiesPage.styled'

type CommunitiesPageProps = {
  communities?: Community[]
}

export default function CommunitiesPage({ communities }: CommunitiesPageProps) {
  return (
    <MaxWidthContainer>
      <Title>Communities</Title>
      <CommunityList communities={communities} />
    </MaxWidthContainer>
  )
}
