import { NextFunction, Request, Response } from 'express'

import { BadRequest } from '../../errors'
import { AdminService } from '../service'

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  const isUserBlocked = await AdminService.blockUserById(req.params.userId)
  if (!isUserBlocked) {
    throw new BadRequest('User has already been blocked by an admin')
  }
  res.status(200).send('Successfully blocked user')
}

const AdminController = {
  blockUser
}

export default AdminController
