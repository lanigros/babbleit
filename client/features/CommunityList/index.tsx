import { Community } from '../../types'
import { CardList } from '../../components'
import CommunityCard from '../CommunityCard'

type CommunityListProps = {
  communities?: Community[]
}

export default function CommunityList({ communities }: CommunityListProps) {
  return (
    <CardList>
      <>
        {communities?.length &&
          communities.map((community) => (
            <CommunityCard {...community} key={community.id} />
          ))}
      </>
    </CardList>
  )
}
