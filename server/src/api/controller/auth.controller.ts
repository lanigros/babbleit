import { Request, Response } from 'express'

import { AuthService } from '../service'

const apiLoginUser = async (req: Request, res: Response) => {
  const user = await AuthService.loginUser(req.body)
  req.session.userId = user.id
  res.json({ user })
}

const authController = {
  apiLoginUser
}

export default authController
