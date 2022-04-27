import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiRemoveCommunity } from '../../api'
import { InfoCard } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { Community } from '../../types'
import { CommunityCardWrapper } from './CommunityCard.styled'

export default function CommunityCard({ id, title, description }: Community) {
  const router = useRouter()
  const { state, dispatch } = useContext(GlobalContext)

  async function removeCommunity() {
    const response = await apiRemoveCommunity({ slug: id })
    response.message && dispatch({ type: 'removeCommunity', payload: { id } })
  }

  return (
    <CommunityCardWrapper>
      <InfoCard
        title={title}
        description={description}
        onClick={() => router.push(`/communities/${id}`)}
        showImage
        allowDelete={state.user.isAdmin}
        onDelete={removeCommunity}
      />
    </CommunityCardWrapper>
  )
}
