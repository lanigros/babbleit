import { useState } from 'react'
import { MaxWidthContainer } from '../../components'
import Button from '../../components/Button'
import DeleteMyAccountModal from '../../features/DeleteMyAccountModal'
import { ProfileCard, CreateCommunityButton, PostList } from '../../features'

import {
  ProfileCardWrapper,
  ProfilePostListWrapper,
  ProfileContainerWrapper,
  ProfileMenu,
  PostListWrapper
} from './profilepage.styled'

export default function ProfilePage() {
  const [showDeletion, setShowDeletion] = useState(false)

  return (
    <MaxWidthContainer>
      <DeleteMyAccountModal
        showModal={showDeletion}
        setShowModal={setShowDeletion}
      />
      <ProfileContainerWrapper>
        <ProfileCardWrapper>
          <ProfileCard />
          <CreateCommunityButton />
          <Button onClick={() => setShowDeletion(true)} danger={true}>
            Delete my account
          </Button>
        </ProfileCardWrapper>
        <ProfilePostListWrapper>
          <ProfileMenu />
          <PostListWrapper>
            <PostList />
          </PostListWrapper>
        </ProfilePostListWrapper>
      </ProfileContainerWrapper>
    </MaxWidthContainer>
  )
}
