import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiRemoveCommunity } from '../../../api'
import { MaxWidthContainer } from '../../../components'
import { GlobalContext } from '../../../state/globalState'
import { CommunityAdminRole, DetailedCommunity } from '../../../types'

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
      <>
        {(communityAdminRole === 'admin' || state.user.isAdmin) && (
          <button onClick={removeCommunity}>
            Remove community permanently
          </button>
        )}
        {community.posts?.map((post) => (
          <div key={post.id}>A POST</div>
        ))}
      </>
    </MaxWidthContainer>
  )
}
