import { Schema, model } from 'mongoose'

import { CommunityDocument } from '../../types'

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be provided'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description must be provided']
    },
    isBlocked: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const CommunityModel = model<CommunityDocument>('community', communitySchema)

export default CommunityModel
