import { Schema, model } from 'mongoose'

import { UserDocument } from '../../types'
import { comparePasswords } from '../../utility'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email must be provided'],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password must be provided']
    },
    username: {
      type: String,
      required: [true, 'Username must be provided'],
      trim: true,
      unique: true
    },
    isBlocked: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

userSchema.methods.comparePassword = async function (password: string) {
  return comparePasswords(password, this.password)
}

const UserModel = model<UserDocument>('user', userSchema)

export default UserModel
