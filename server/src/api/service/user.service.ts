import { Types } from 'mongoose'

import { NotFound } from '../../errors/'
import { UserData } from '../../types'
import { AdminModel, UserModel } from '../model'

const findUserById = async (
  userId: string
): Promise<UserData & { isBlocked: boolean }> => {
  const user = await UserModel.findById(new Types.ObjectId(userId))

  if (!user) {
    throw new NotFound('User not found')
  }

  const { _id: id, email, username, isBlocked } = user._doc

  const admin = await AdminModel.exists({
    userId: new Types.ObjectId(id)
  })

  return { id, email, username, isAdmin: !!admin, isBlocked: !!isBlocked }
}

const UserService = {
  findUserById
}

export default UserService
