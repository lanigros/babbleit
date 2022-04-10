import { Request, Response } from 'express'

import { CommunityService } from '../service'

const createCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.saveNewCommunity(req.body)
  res.json({ community })
}

const getCommunities = async (req: Request, res: Response) => {
  const allCommunities = await CommunityService.getAllCommunities()

  res.json({ allCommunities: allCommunities })
}

const communityController = {
  createCommunity,
  getCommunities
}

export default communityController
