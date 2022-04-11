import { Request, Response } from 'express'

import { Unauthorized } from '../../errors/Unauthorized'
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

const userController = {
  getWhoAmI
}

export default userController
