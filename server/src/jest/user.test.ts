import mongoose from 'mongoose'

import { AuthService, UserService } from '../api/service'
import { MONGO_URI } from '../configuration'

beforeAll(async () => {
  await mongoose.connect(MONGO_URI)
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoose.disconnect()
})

const user = {
  email: 'testertest@gmail.com',
  password: '123aPassword__',
  username: 'TheBestTest'
}

let userId: string

test('Register a user', async () => {
  const createdUser = await AuthService.registerNewUser(user)
  userId = createdUser.id
  const { email, username } = createdUser
  expect({ email, username }).toMatchObject({
    email: user.email,
    username: user.username
  })
})

test('Remove a user', async () => {
  const isDeleted = await UserService.deleteMyAccountAndAllMyCommunities(userId)
  expect(isDeleted).toBeTruthy()
})
