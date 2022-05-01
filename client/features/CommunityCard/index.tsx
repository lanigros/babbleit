import { useRouter } from 'next/router'
import { useContext } from 'react'
import { apiBlockCommunity, apiRemoveCommunity } from '../../api'
import { InfoCard } from '../../components'
import { GlobalContext } from '../../state/globalState'
import { Community, IsBlocked } from '../../types'
import { CommunityCardWrapper } from './CommunityCard.styled'

export default function CommunityCard({
  id,
  title,
  description,
  isBlocked,
  creatorId
}: Community & IsBlocked) {
  const router = useRouter()
  const { state, dispatch } = useContext(GlobalContext)

  async function removeCommunity() {
    const response = await apiRemoveCommunity({ slug: id })
    response.message && dispatch({ type: 'removeCommunity', payload: { id } })
  }

  async function changeBlockedStatus() {
    try {
      const response = await apiBlockCommunity({
        data: { isBlocked: isBlocked ? 0 : 1 },
        slug: `${id}/blocked`
      })

      if (response) {
        dispatch({
          type: 'updateCommunity',
          payload: {
            id,
            title,
            description,
            creatorId,
            isBlocked: isBlocked ? 0 : 1
          }
        })
        console.log('done')
      }
    } catch (e) {
      console.log('oopsie')
    }
  }

  return (
    <CommunityCardWrapper>
      <InfoCard
        title={title}
        description={description}
        onClick={() => router.push(`/communities/${id}`)}
        showImage
        allowDelete={state.user.isAdmin || creatorId === state.user.id}
        onDelete={removeCommunity}
        isBlocked={isBlocked}
        allowChangeBlocked={state.user.isAdmin}
        onChangeBlocked={changeBlockedStatus}
      />
    </CommunityCardWrapper>
  )
}
