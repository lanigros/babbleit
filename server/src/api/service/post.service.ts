import { PostModel, CommunityModel, UserModel } from '../model'
import { CommunityService } from '../service'
import { Post, PostRegistration } from '../../types'
import { NotFound, Unauthorized } from '../../errors'

const getPosts = async (communityId: string) => {
  const community = await CommunityService.findCommunityById(communityId)
  return community.posts
}

const createPost = async (
  userId: string,
  communityId: string,
  newPost: Post
) => {
  const user = await UserModel.findOne({ _id: userId })
  const username = user?._doc.username

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

const updatePost = async (
  postId: string,
  userId: string,
  update: PostRegistration
) => {
  const author = await PostModel.exists({
    _id: postId,
    userId
  })

  if (!author) {
    throw new Unauthorized('You are not the owner of this post')
  }

  const result = await PostModel.updateOne({ _id: postId }, { ...update })
  return result.acknowledged
}

const updateBlockedStatus = async (
  _id: string,
  isBlocked: number
): Promise<boolean> => {
  const result = await PostModel.updateOne({ _id }, { isBlocked })

  return result.acknowledged
}

const deletePost = async (
  postId: string,
  userId: string,
  hasAdminRole: boolean
) => {
  if (!hasAdminRole) {
    const author = await PostModel.exists({
      _id: postId,
      userId
    })

    if (!author) {
      throw new Unauthorized('You are not the owner of this post')
    }
  }

  const result = await PostModel.deleteOne({ _id: postId })
  return result.acknowledged
}

const findPostById = async (postId: string) => {
  const post = await PostModel.findOne({ _id: postId })

  if (!post) {
    throw new NotFound('No such post')
  }

  const { _id, userId, username, communityId, title, content, isBlocked } =
    post._doc

  return {
    id: _id.toString(),
    userId: userId.toString(),
    username,
    communityId: communityId.toString(),
    title,
    content,
    isBlocked
  }
}

const PostService = {
  getPosts,
  createPost,
  updatePost,
  updateBlockedStatus,
  deletePost,
  findPostById
}

export default PostService
