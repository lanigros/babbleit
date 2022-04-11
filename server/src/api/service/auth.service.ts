import { Types } from 'mongoose'

import { BadRequest } from '../../errors/BadRequest'
import { Conflict } from '../../errors/Conflict'
import { Unauthorized } from '../../errors/Unauthorized'
import { UserLogin, UserRegistration } from '../../types'
import { hashPassword } from '../../utility'
import { AdminModel, UserModel } from '../model'

const registerNewUser = async ({
  email,
  password,
  username
}: UserRegistration) => {
  const existingUser = await UserModel.exists({
    $or: [{ email }, { username }]
  })

  if (existingUser) {
    throw new Conflict('User already exists')
  }

  const hashedPassword = await hashPassword(password)

  const user = new UserModel({
    email,
    password: hashedPassword,
    username
  })

  const newUser = await user.save()

  const { _id: id, username: savedUsername, email: savedEmail } = newUser._doc

  return { id, username: savedUsername, email: savedEmail, isAdmin: false }
}

const loginUser = async ({ email, password }: UserLogin) => {
  const user = await UserModel.findOne({ email })

  const isAuthenticated = (await user?.comparePassword(password)) || false

  if (!user || !isAuthenticated) {
    throw new BadRequest('Bad credentials')
  }

  const { _id: id, email: savedEmail, username, isBlocked } = user._doc

  if (isBlocked) {
    throw new Unauthorized(
      'Sorry, you have been blocked. Contact an admin for more information'
    )
  }

  const admin = await AdminModel.findOne({
    userId: new Types.ObjectId(id)
  })

  return { id, email: savedEmail, username, isAdmin: !!admin }
}

const AuthService = {
  registerNewUser,
  loginUser
}

export default AuthService
