import { Request, Response } from 'express'

import { UserService } from '../service'

const apiCreateUser = async (req: Request, res: Response) => {
  const user = await UserService.saveNewUser(req.body)
  res.json({ user })
}

const userController = {
  apiCreateUser
}

export default userController
