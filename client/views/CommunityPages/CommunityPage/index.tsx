import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiRemoveCommunity } from '../../../api'
import { MaxWidthContainer } from '../../../components'
import Button from '../../../components/Button'
import { PostList } from '../../../features'
import { GlobalContext } from '../../../state/globalState'
import { CommunityAdminRole, DetailedCommunity } from '../../../types'
import { ButtonWrapper, Title } from './CommunitiesPage.styled'

type CommunityProps = {
  communityAdminRole: CommunityAdminRole
  community: DetailedCommunity
}

export default function CommunityPage({
  community,
  communityAdminRole
}: CommunityProps) {
  const router = useRouter()
  const { state } = useContext(GlobalContext)
  function removeCommunity() {
    async function deleteCommunity() {
      await apiRemoveCommunity({
        slug: router.query.slug as string
      })
      router.reload()
    }
    deleteCommunity()
  }

  return (
    <MaxWidthContainer>
      <Title>
        Community <span>{`'${community.title}'`}</span>
      </Title>
      <ButtonWrapper>
        <Button onClick={() => router.push(`${router.query.slug}/members`)}>
          See members
        </Button>
        {(communityAdminRole === 'admin' || state.user.isAdmin) && (
          <Button danger onClick={removeCommunity}>
            Delete community
          </Button>
        )}
      </ButtonWrapper>
      <PostList isCommunityAdmin={!!communityAdminRole} />
    </MaxWidthContainer>
  )
}
