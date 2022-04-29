import { MaxWidthContainer } from '../../../components'
import UpdateCommunity from './UpdateCommunity'

import { BannerTitle, Banner } from './EditCommunity.styled'
import { DetailedCommunity } from '../../../types'

type CommunityProps = {
  community: DetailedCommunity
}

export default function EditCommunity({ community }: CommunityProps) {
  return (
    <>
      <MaxWidthContainer>
        <Banner>
          <BannerTitle>
            <span>Editing</span> &quot;{community.title}&quot; community
          </BannerTitle>
        </Banner>
        <UpdateCommunity community={community} />
      </MaxWidthContainer>
    </>
  )
}
