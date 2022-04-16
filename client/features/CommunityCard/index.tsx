import { useRouter } from 'next/router'
import { InfoCard } from '../../components'
import { Community } from '../../types'
import { CommunityCardWrapper } from './CommunityCard.styled'

export default function CommunityCard({ id, title, description }: Community) {
  const router = useRouter()

  return (
    <CommunityCardWrapper onClick={() => router.push(`/communities/${id}`)}>
      <InfoCard title={title} description={description} />
    </CommunityCardWrapper>
  )
}
