import { Types } from 'mongoose'

import { NotFound } from '../../errors'
import { PublicUserFields, UpdateableUserFields, UserData } from '../../types'
import { hashPassword } from '../../utility'
import { AdminModel, UserModel } from '../model'
import AdminService from './admin.service'
import CommunityService from './community.service'

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

const deleteUserById = async (userId: string): Promise<string | null> => {
  const user = await UserModel.findByIdAndRemove(userId)

  if (!user) {
    return null
  }

  return user._doc._id.toString()
}

const findUsers = async (
  showBlockedUsers = false
): Promise<PublicUserFields[]> => {
  const users = await UserModel.find(
    showBlockedUsers ? {} : { isBlocked: 0 }
  ).select('_id isBlocked username')

  return users.map((user) => {
    const { _id, username, isBlocked } = user._doc
    return {
      id: _id.toString(),
      username,
      isBlocked
    }
  })
}

const updateBlockedStatus = async (
  _id: string,
  isBlocked: number
): Promise<boolean> => {
  const result = await UserModel.updateOne({ _id }, { isBlocked })

  return !!result.acknowledged
}

const deleteMyAccountAndAllMyCommunities = async (
  userId: string
): Promise<boolean> => {
  await CommunityService.deleteCommunitiesOwnedByUserId(userId)

  await AdminService.deleteCommunityAdminsByUserId(userId)

  const deletedUserId = await deleteUserById(userId)

  return !!deletedUserId
}

const UserService = {
  findUserById,
  updateFields,
  findUsers,
  updateBlockedStatus,
  deleteUserById,
  deleteMyAccountAndAllMyCommunities
}

export default UserService
