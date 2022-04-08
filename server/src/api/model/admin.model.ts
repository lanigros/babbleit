import { Schema, model } from 'mongoose'

import { AdminDocument } from '../../types'

const adminSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'User id must be provided'],
    unique: true
  }
})

const AdminModel = model<AdminDocument>('admin', adminSchema)

export default AdminModel
