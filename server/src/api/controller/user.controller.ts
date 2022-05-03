import { Request, Response } from 'express'

import { Unauthorized } from '../../errors'
import { createResponseMessage } from '../../utility'
import destroySession from '../../utility/destroySession'
import UserService from '../service/user.service'

const getWhoAmI = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    res.json({})
    return
  }

  const foundUser = await UserService.findUserById(
    req.session.userId,
    req.query.withPosts as string
  )

  const { user, posts } = foundUser

  if (user.isBlocked) {
    throw new Unauthorized('User has been blocked by an admin')
  }

  res.json(posts ? { user, posts } : { user })
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

const deleteUserAccountWithCommunities = async (
  req: Request,
  res: Response
) => {
  const deletedResult = await UserService.deleteMyAccountAndAllMyCommunities(
    req.params.userId
  )

  if (!deletedResult) {
    throw new Error('Something went wrong')
  }

  res.json(createResponseMessage('Successfully deleted useraccount'))
}

const deleteMyAccountAndAllMyCommunities = async (
  req: Request,
  res: Response
) => {
  const deletedResult = await UserService.deleteMyAccountAndAllMyCommunities(
    req.session.userId as string
  )

  if (!deletedResult) {
    throw new Error('Something went wrong')
  }

  await destroySession(req, res)

  res.json(createResponseMessage('Successfully deleted your account'))
}

const userController = {
  getWhoAmI,
  updateFields,
  getUsers,
  updateBlockedStatus,
  deleteMyAccountAndAllMyCommunities,
  deleteUserAccountWithCommunities
}

export default userController
