import { MaxWidthContainer } from '../../components'
import { ProfileCard, CreateCommunityButton, PostList } from '../../features'
import {
  ProfileCardWrapper,
  ProfilePostListWrapper,
  ProfileContainerWrapper,
  ProfileMenu,
  PostListWrapper
} from './profilepage.styled'


export default function ProfilePage() {
  return (
      <MaxWidthContainer>
        <ProfileContainerWrapper>
          <ProfileCardWrapper>
            <ProfileCard />
            <CreateCommunityButton />
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
