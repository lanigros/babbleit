import { Schema, model } from 'mongoose'

import { CommunityMemberDocument } from '../../types'

const communityMemberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User id must be provided']
  },
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'community',
    required: [true, 'Community id must be provided']
  }
})

const CommunityMemberModel = model<CommunityMemberDocument>(
  'communityMember',
  communityMemberSchema
)

export default CommunityMemberModel
