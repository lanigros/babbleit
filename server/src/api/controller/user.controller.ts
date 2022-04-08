import { Request, Response } from 'express'

import { UserService } from '../service'

const apiCreateUser = async (req: Request, res: Response) => {
  const user = await UserService.saveNewUser(req.body)
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, salt, __v, _id, ...userResponse } = user._doc
  res.json({ user: { ...userResponse, id: _id } })
}

const userController = {
  apiCreateUser
}

export default userController
