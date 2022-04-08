import { hashPassword } from '../../utility'
import { UserModel } from '../model'

async function saveNewUser(newUser: {
  email: string
  password: string
  username: string
}) {
  const { email, password, username } = newUser
  const { hashedPassword, salt } = await hashPassword(password)

  const user = new UserModel({
    email,
    password: hashedPassword,
    username,
    salt
  })

  return await user.save()
}

const UserService = {
  saveNewUser
}

export default UserService
