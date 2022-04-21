import { Request, Response } from 'express'

import { Unauthorized } from '../../errors'
import { PostService } from '../service'

const getAllPosts = async (req: Request, res: Response) => {
  const allPostInCommunity = await PostService.getPosts()

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
  getAllPosts,
  createPost
}

export default postController
