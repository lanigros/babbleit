import { Request, Response } from 'express'

import { Unauthorized } from '../../errors'
import { createResponseMessage } from '../../utility'
import destroySession from '../../utility/destroySession'
import { CommunityService, AdminService } from '../service'
import UserService from '../service/user.service'

const getWhoAmI = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    res.json({})
    return
  }

  const foundUser = await UserService.findUserById(req.session.userId)
  const { isBlocked, ...user } = foundUser

  if (isBlocked) {
    throw new Unauthorized('User has been blocked by an admin')
  }

  res.json({ user })
}

const updateFields = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new Error('Something went wrong')
  }

  await UserService.updateFields(req.session.userId, req.body)
  res.json(
    createResponseMessage(
      `Successfully updated fields: ${Object.keys(req.body).join(', ')}`
    )
  )
}

const getUsers = async (req: Request, res: Response) => {
  const users = await UserService.findUsers(req.session.isAdmin)
  res.json({ users })
}

const updateBlockedStatus = async (req: Request, res: Response) => {
  const isUpdateSuccessful = await UserService.updateBlockedStatus(
    req.params.userId,
    req.body.isBlocked
  )

  if (!isUpdateSuccessful) {
    throw new Error('Update of isBlocked was unsuccessful')
  }

  res.json(
    createResponseMessage(
      `User successfully ${req.body.isBlocked ? 'blocked' : 'unblocked'}`
    )
  )
}

const deleteMyAccount = async (req: Request, res: Response) => {
  const userId = req.session.userId
  if (!userId) return

  const numberOfDeletedCommunities =
    await CommunityService.deleteCommunitiesOwnedByUserId(userId)

  await AdminService.deleteCommunityAdminsByUserId(userId)

  await destroySession(req, res)

  const emailOfDeletedUser = UserService.deleteUserById(userId)
  res.json(
    createResponseMessage(
      'Succesfully deleted: ' +
        emailOfDeletedUser +
        ', deleted communities: ' +
        numberOfDeletedCommunities
    )
  )
}

const userController = {
  getWhoAmI,
  updateFields,
  getUsers,
  updateBlockedStatus,
  deleteMyAccount
}

export default userController
