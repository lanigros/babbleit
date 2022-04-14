import { Request, Response } from 'express'

import { CommunityService } from '../service'

const createCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.saveNewCommunity(req.body)
  res.json({ community })
}

const getCommunities = async (_: Request, res: Response) => {
  const communities = await CommunityService.getAllCommunities()
  res.json({ communities })
}

const getCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.findCommunityById(
    req.params.id,
    req.session.isAdmin
  )
  res.json({ community })
}

const communityController = {
  createCommunity,
  getCommunities,
  getCommunity
}

export default communityController
