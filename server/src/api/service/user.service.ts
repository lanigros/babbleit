import { Types } from 'mongoose'

import { NotFound } from '../../errors'
import { UpdateableUserFields, UserData } from '../../types'
import { hashPassword } from '../../utility'
import { AdminModel, UserModel } from '../model'

const findUserById = async (
  userId: string
): Promise<UserData & { isBlocked: boolean }> => {
  const user = await UserModel.findById(new Types.ObjectId(userId))

  if (!user) {
    throw new NotFound('User not found')
  }

  const { _id, email, username, isBlocked } = user._doc

  const admin = await AdminModel.exists({
    userId: _id
  })

  return {
    id: _id.toString(),
    email,
    username,
    isAdmin: !!admin,
    isBlocked: !!isBlocked
  }
}

const updateFields = async (
  _id: string,
  fieldsToUpdate: UpdateableUserFields
) => {
  const { password } = fieldsToUpdate
  let update = { ...fieldsToUpdate }

  if (password) {
    const hashedPassword = await hashPassword(password)
    update = { ...fieldsToUpdate, password: hashedPassword }
  }

  const user = await UserModel.findOneAndUpdate({ _id, isBlocked: 0 }, update, {
    new: true
  })

  if (!user) {
    throw new Error('Something went wrong')
  }

  return true
}

const UserService = {
  findUserById,
  updateFields
}

export default UserService
