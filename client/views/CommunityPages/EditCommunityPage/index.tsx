import { MaxWidthContainer } from '../../../components'
import { CommunityRegistration } from '../../../types'
import { CreateCommunityForm } from '../../../features'

type CommunityProps = {
  community: CommunityRegistration
}

export default function EditCommunity({ community }: CommunityProps) {
  return (
    <>
      <MaxWidthContainer>
        <CreateCommunityForm communityToBeEdited={community} />
      </MaxWidthContainer>
    </>
  )
}
