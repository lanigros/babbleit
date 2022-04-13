import { NextFunction, Request, Response } from 'express'

import { BadRequest } from '../../errors'
import AdminService from '../service/admin.service'

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  const blockedUser = await AdminService.blockUserById(req.params.userId)
  if (blockedUser === true) {
    res.status(200).send('Successfully blocked user')
    return
  }
  throw new BadRequest('User has been blocked by an admin')
}

const AdminController = {
  blockUser
}

export default AdminController
