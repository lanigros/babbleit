import { MaxWidthContainer } from '../../../components'
import { UserList } from '../../../features'
import MemberList from '../../../features/MemberList'
import { CommunityAdminRole } from '../../../types'

type MembersPageProps = {
  communityAdminRole: CommunityAdminRole
}

export default function MembersPage({ communityAdminRole }: MembersPageProps) {
  return (
    <MaxWidthContainer>
      <MemberList communityAdminRole={communityAdminRole} />
    </MaxWidthContainer>
  )
}
