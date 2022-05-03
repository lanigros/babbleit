import { Types } from 'mongoose'

import { NotFound } from '../../errors'
import {
  CommunityPost,
  PublicUserFields,
  UpdateableUserFields,
  UserResponse
} from '../../types'
import { hashPassword } from '../../utility'
import {
  AdminModel,
  CommunityAdminModel,
  CommunityModel,
  PostModel,
  UserModel
} from '../model'
import AdminService from './admin.service'
import CommunityService from './community.service'

const findUserById = async (
  userId: string,
  withPosts: string
): Promise<UserResponse> => {
  const user = await UserModel.findById(new Types.ObjectId(userId))
  if (!user) {
    throw new NotFound('User not found')
  }
  const { _id, email, username, isBlocked } = user._doc
  const admin = await AdminModel.exists({
    userId: _id
  })

  const fetchedUser = {
    id: _id.toString(),
    email,
    username,
    isAdmin: !!admin,
    isBlocked
  }

  if (withPosts == 'false') {
    return { user: fetchedUser }
  }

  const posts = await PostModel.aggregate<CommunityPost>([
    { $match: { userId: new Types.ObjectId(user._id) } },
    {
      $project: {
        _id: 0,
        title: 1,
        content: 1,
        username: 1,
        id: { $toString: '$_id' }
      }
    }
  ])

  return { user: fetchedUser, posts }
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

  const user = await UserModel.findOneAndUpdate({ _id, isBlocked: 0 }, update)

  const oldUsername = user?._doc.username
  const newUsername = update.username

  if (newUsername && newUsername !== oldUsername) {
    await CommunityAdminModel.updateOne(
      { username: oldUsername },
      { username: newUsername }
    )
    await PostModel.updateMany(
      { username: oldUsername },
      { username: newUsername }
    )
    await CommunityModel.updateMany(
      { 'members.username': oldUsername },
      {
        $set: { 'members.$[i].username': newUsername }
      },
      { arrayFilters: [{ 'i.username': oldUsername }] }
    )
  }

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
