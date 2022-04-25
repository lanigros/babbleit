import { InfoCard } from '../../components'
import { CommunityPost } from '../../types'
import { PostCardWrapper } from './PostCard.styled'

export default function PostCard({ title, content }: CommunityPost) {
  return (
    <PostCardWrapper>
      <InfoCard title={title} description={content} showFooter />
    </PostCardWrapper>
  )
}
