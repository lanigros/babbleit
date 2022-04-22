import { PostModel, CommunityModel, UserModel } from '../model'
import { UserService, CommunityService } from '../service'
import { Post } from '../../types'

const getPosts = async (communityId: string) => {
  return await CommunityService.findCommunityById(communityId).then(
    (community) => {
      return community.posts
    }
  )
}

const createPost = async (
  userId: string,
  communityId: string,
  newPost: Post
) => {
  const username = await UserModel.findOne({ _id: userId }).then((user) => {
    return user?._doc.username
  })

  const { title, content } = newPost

  const post = new PostModel({
    userId,
    username,
    communityId,
    title,
    content
  })

  const savedPost = await post.save()

  const {
    _id,
    userId: savedId,
    username: savedUsername,
    communityId: savedCommunityId,
    title: savedTitle,
    content: savedContent
  } = savedPost._doc

  await CommunityModel.findOneAndUpdate(
    { _id: communityId },
    { $push: { posts: { postId: _id } } }
  )

  return {
    id: _id.toString(),
    userId: savedId,
    username: savedUsername,
    communityId: savedCommunityId,
    title: savedTitle,
    content: savedContent
  }
}

const PostService = {
  getPosts,
  createPost
}
export default PostService
