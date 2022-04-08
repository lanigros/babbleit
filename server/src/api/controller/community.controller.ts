import { Request, Response } from 'express'

import { CommunityService } from '../service'

const apiCreateCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.saveNewCommunity(req.body)
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, description, __v, _id, ...communityResponse } = community._doc
  res.json({ community: { ...communityResponse, id: _id } })
}

const communityController = {
  apiCreateCommunity
}

export default communityController
