import { BadRequest } from '../../errors/BadRequest'
import { UserLogin } from '../../types'
import { UserModel } from '../model'

const loginUser = async ({ email, password }: UserLogin) => {
  const user = await UserModel.findOne({ email })
  //Todo find godmode admin if exists

  const isAuthenticated = (await user?.comparePassword(password)) || false
  if (!user || !isAuthenticated) {
    throw new BadRequest('Bad credentials')
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, salt, __v, _id, ...userResponse } = user._doc
  return { id: _id, ...userResponse }
}

const AuthService = {
  loginUser
}

export default AuthService
