import { Schema, model } from 'mongoose'

import { User } from '../../types'
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
    },
    salt: {
      type: String,
      required: [true, 'Salt must be provided']
    }
  },
  { timestamps: true }
)

userSchema.methods.matchesPassword = comparePasswords

const UserModel = model<Omit<User, '_id'>>('user', userSchema)

export default UserModel
