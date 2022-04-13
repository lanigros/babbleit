import { UserService } from '../service'
import { UserModel } from '../model'

const blockUserById = async (Id: string) => {
  const user = await UserService.findUserById(Id)
  const userId = user.id

  if (!user.isBlocked) {
    await UserModel.updateOne({ _id: userId }, { isBlocked: true })
    return true
  }
  return false
}

const AdminService = {
  blockUserById
}

export default AdminService
