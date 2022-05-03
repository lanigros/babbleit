import { useContext, useState } from 'react'
import { MaxWidthContainer } from '../../components'
import Button from '../../components/Button'
import DeleteMyAccountModal from '../../features/DeleteMyAccountModal'
import CenteredModal from '../../components/CenteredModal'
import { ProfileCard, CreateCommunityButton, PostList } from '../../features'
import SignupOrUpdateProfile from '../../features/SignupOrUpdateProfile'
import { GlobalContext } from '../../state/globalState'

import {
  ProfileCardWrapper,
  ProfilePostListWrapper,
  ProfileContainerWrapper,
  ProfileMenu,
  PostListWrapper
} from './profilepage.styled'

export default function ProfilePage() {
  const [showDeletion, setShowDeletion] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const { state } = useContext(GlobalContext)

  return (
    <MaxWidthContainer>
      <DeleteMyAccountModal
        showModal={showDeletion}
        setShowModal={setShowDeletion}
      />
      {showUpdateModal && (
        <CenteredModal setShowModal={setShowUpdateModal}>
          <SignupOrUpdateProfile
            onSubmit={() => setShowUpdateModal(false)}
            currentUser={state.user}
          />
        </CenteredModal>
      )}
      <ProfileContainerWrapper>
        <ProfileCardWrapper>
          <Button onClick={() => setShowUpdateModal(true)}>Edit profile</Button>
          <ProfileCard />
          <CreateCommunityButton />
          <Button onClick={() => setShowDeletion(true)} danger>
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
