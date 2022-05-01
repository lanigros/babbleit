import { Request, Response } from 'express'

import { BadRequest, Unauthorized } from '../../errors'
import { createResponseMessage } from '../../utility'
import { CommunityService } from '../service'

const createCommunity = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new Error(`You shouldn't be here`)
  }

  const community = await CommunityService.saveNewCommunity(
    req.body,
    req.session.userId
  )

  res.json({ community })
}

const getCommunities = async (req: Request, res: Response) => {
  const communities = await CommunityService.getAllCommunities(
    req.session.isAdmin
  )
  res.json({ communities })
}

const getCommunity = async (req: Request, res: Response) => {
  const community = await CommunityService.findCommunityById(
    req.params.id,
    req.session.isAdmin,
    req.session.isAdmin || !!req.communityAdminRole
  )
  res.json({ community, communityAdminRole: req.communityAdminRole || null })
}

const postModerator = async (req: Request, res: Response) => {
  if (req.communityAdminRole !== 'admin') {
    throw new Unauthorized(
      'Access not allowed as you are not an admin of this community'
    )
  }
  const isModeratorAdded = await CommunityService.addModerator(
    req.params.id,
    req.body.userId
  )

  if (!isModeratorAdded) {
    throw new BadRequest('Moderator already exists')
  }

  res.json(createResponseMessage('Moderator added'))
}

const deleteModerator = async (req: Request, res: Response) => {
  if (req.communityAdminRole !== 'admin') {
    throw new Unauthorized(
      'Access not allowed as you are not an admin of this community'
    )
  }

  const isModeratorDeleted = await CommunityService.removeModerator(
    req.params.id,
    req.params.userId
  )

  if (!isModeratorDeleted) {
    throw new Error('Something went wrong when removing moderator')
  }

  res.json(createResponseMessage('Moderator removed'))
}

const deleteCommunity = async (req: Request, res: Response) => {
  const acknowledgedResults = await CommunityService.deleteCommunityById(
    req.params.id
  )

  if (!acknowledgedResults.isCommunityDeleted) {
    throw new Error(
      'Something went wrong and the community could not be properly deleted'
    )
  }

  res.json(createResponseMessage(`Successfully deleted community`))
}

const joinCommunity = async (req: Request, res: Response) => {
  const isMembershipSuccessful = await CommunityService.addCommunityMember(
    req.params.id,
    req.session.userId as string
  )

  if (!isMembershipSuccessful) {
    throw new BadRequest('Member already exists')
  }

  res.json(createResponseMessage('You are now a member. Welcome!'))
}

const addCommunityMember = async (req: Request, res: Response) => {
  const isMembershipSuccessful = await CommunityService.addCommunityMember(
    req.params.id,
    req.body.userId
  )

  if (!isMembershipSuccessful) {
    throw new BadRequest('Member already exists')
  }

  res.json(createResponseMessage('Membership created'))
}

const removeCommunityMember = async (req: Request, res: Response) => {
  const isMembershipRemoved = await CommunityService.removeCommunityMember(
    req.params.id,
    req.body.userId
  )

  if (!isMembershipRemoved) {
    throw new BadRequest('Member could not be removed')
  }

  res.json(createResponseMessage('Member removed'))
}

const leaveCommunity = async (req: Request, res: Response) => {
  const isMembershipRemoved = await CommunityService.removeCommunityMember(
    req.params.id,
    req.session.userId as string
  )

  if (!isMembershipRemoved) {
    throw new BadRequest('Member could not be removed')
  }

  res.json(
    createResponseMessage(
      'You have now left the community... come back please?'
    )
  )
}

const communityController = {
  createCommunity,
  getCommunities,
  getCommunity,
  postModerator,
  deleteModerator,
  deleteCommunity,
  joinCommunity,
  addCommunityMember,
  leaveCommunity,
  removeCommunityMember
}

export default communityController
