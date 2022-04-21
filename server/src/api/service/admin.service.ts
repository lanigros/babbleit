import { CommunityAdminModel, UserModel } from '../model'

const blockUserById = async (_id: string, isBlocked: number) => {
  const user = await UserModel.updateOne({ _id }, { isBlocked }, { new: true })

  return !!user
}

const deleteCommunityAdminsByUserId = async (userId: string) => {
  const deleted = await CommunityAdminModel.deleteOne({
    userId
  })
  return deleted.acknowledged
}

const AdminService = {
  blockUserById,
  deleteCommunityAdminsByUserId
}

export default AdminService
