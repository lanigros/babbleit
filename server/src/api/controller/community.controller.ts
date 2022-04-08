import { Request, Response } from 'express'

import { CommunityService } from '../service'

const createCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.saveNewCommunity(req.body)
  res.json({ community })
}

const communityController = {
  createCommunity
}

export default communityController
