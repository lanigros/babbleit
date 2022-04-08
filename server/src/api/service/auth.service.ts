import { Types } from 'mongoose'

import { BadRequest } from '../../errors/BadRequest'
import { UserLogin, UserRegistration } from '../../types'
import { hashPassword } from '../../utility'
import { AdminModel, UserModel } from '../model'

const registerNewUser = async ({
  email,
  password,
  username
}: UserRegistration) => {
  const { hashedPassword, salt } = await hashPassword(password)

  const user = new UserModel({
    email,
    password: hashedPassword,
    username,
    salt
  })

  const newUser = await user.save()

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, salt: secret, __v, _id, ...userResponse } = newUser._doc

  return { id: _id, ...userResponse, isAdmin: false }
}

const loginUser = async ({ email, password }: UserLogin) => {
  const user = await UserModel.findOne({ email })
  //Todo find godmode admin if exists

  const isAuthenticated = (await user?.comparePassword(password)) || false

  if (!user || !isAuthenticated) {
    throw new BadRequest('Bad credentials')
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, salt, __v, _id, ...userResponse } = user._doc

  const admin = await AdminModel.findOne({
    userId: new Types.ObjectId(_id)
  })

  return { id: _id, ...userResponse, isAdmin: !!admin }
}

const AuthService = {
  registerNewUser,
  loginUser
}

export default AuthService
