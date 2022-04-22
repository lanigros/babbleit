import { Request, Response } from 'express'

import { PostService } from '../service'

const getAllPostsInCommunity = async (req: Request, res: Response) => {
  const allPostInCommunity = await PostService.getPosts(req.params.id)

  res.json({ allPostInCommunity })
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
  getAllPostsInCommunity,
  createPost
}

export default postController
