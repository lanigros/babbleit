import { Types } from 'mongoose'

import { NotFound } from '../../errors'
import { PublicUserFields, UpdateableUserFields, UserData } from '../../types'
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
): Promise<boolean> => {
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

const findUsers = async (
  showBlockedUsers = false
): Promise<PublicUserFields[]> => {
  const users = await UserModel.find(showBlockedUsers ? {} : { isBlocked: 0 })
    .select('_id isBlocked username')
    .limit(10)
    .skip(0)

  return users.map((user) => {
    const { _id, username, isBlocked } = user._doc
    return {
      id: _id.toString(),
      username,
      isBlocked
    }
  })
}

const UserService = {
  findUserById,
  updateFields,
  findUsers
}

export default UserService
