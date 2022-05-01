import { MaxWidthContainer } from '../../../components'
import { PostForm } from '../../../features'
import { CommunityPost } from '../../../types'

type EditPostProps = {
  post: CommunityPost
}

export default function EditPostPage({ post }: EditPostProps) {
  return (
    <>
      <MaxWidthContainer>
        <PostForm currentPost={post} />
      </MaxWidthContainer>
    </>
  )
}
