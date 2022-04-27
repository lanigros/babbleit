import { Request, Response } from 'express'

import { PostService } from '../service'

const getPostsInCommunity = async (req: Request, res: Response) => {
  const posts = await PostService.getPosts(req.params.id)

  res.json({ posts: posts })
}

const createPost = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new Error(`You shouldn't be here`)
  }
  const newPost = await PostService.createPost(
    req.session.userId,
    req.params.id,
    req.body
  )
  res.json({ newPost })
}

const postController = {
  getPostsInCommunity,
  createPost
}

export default postController
