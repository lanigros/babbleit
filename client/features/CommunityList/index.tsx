import { useContext } from 'react'

import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import CommunityCard from '../CommunityCard'

export default function CommunityList() {
  const { state } = useContext(GlobalContext)
  return (
    <CardList>
      <>
        {state.communities?.length &&
          state.communities.map((community) => (
            <CommunityCard {...community} key={community.id} />
          ))}
      </>
    </CardList>
  )
}
