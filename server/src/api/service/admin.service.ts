import { CommunityAdminModel, UserModel } from '../model'

const blockUserById = async (_id: string, isBlocked: number) => {
  const user = await UserModel.updateOne({ _id }, { isBlocked }, { new: true })

  return !!user
}

const deleteCommunityAdminsByUserId = async (userId: string) => {
  const deleted = await CommunityAdminModel.deleteMany({
    userId: userId,
    role: 'admin'
  })
  return deleted
}

const AdminService = {
  blockUserById,
  deleteCommunityAdminsByUserId
}

export default AdminService
