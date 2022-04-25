import { Types } from 'mongoose'

import { Unauthorized, NotFound } from '../../errors'
import {
  Community,
  CommunityData,
  CommunityRegistration,
  CommunitySelect,
  Role
} from '../../types'
import {
  CommunityAdminModel,
  CommunityModel,
  UserCommunityModel,
  UserModel
} from '../model'

async function saveNewCommunity(
  newCommunity: CommunityRegistration,
  userId: string
): Promise<CommunityData> {
  const { title, description } = newCommunity

  const community = new CommunityModel({
    title,
    description
  })

  const savedCommunity = await community.save()

  const {
    _id,
    title: savedTitle,
    description: savedDescription
  } = savedCommunity._doc

  const adminRole: Role = {
    role: 'admin',
    communityId: _id
  }

  await CommunityAdminModel.findOneAndUpdate(
    { userId },
    {
      $push: { roles: { ...adminRole } }
    },
    { upsert: true }
  )

  return {
    id: _id.toString(),
    title: savedTitle,
    description: savedDescription
  }
}

async function getAllCommunities(
  showBlockedCommunities = false
): Promise<CommunityData[]> {
  const communities = await CommunityModel.find<CommunitySelect>(
    showBlockedCommunities
      ? {}
      : {
          isBlocked: false
        }
  )

  return communities.map((community) => {
    return {
      id: community._id.toString(),
      title: community.title,
      description: community.description
    }
  })
}

// TODO add posts to response
async function findCommunityById(
  communityId: string,
  showBlockedCommunities = false
): Promise<Community> {
  const result = await CommunityModel.aggregate<Community>([
    { $match: { _id: new Types.ObjectId(communityId) } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'communityId',
        pipeline: [
          {
            $project: {
              _id: 0,
              title: 1,
              content: 1,
              username: 1,
              id: { $toString: '$_id' }
            }
          }
        ],
        as: 'posts'
      }
    },
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        title: 1,
        description: 1,
        isBlocked: 1,
        members: {
          $map: {
            input: '$members',
            in: {
              userId: { $toString: '$$this.userId' },
              username: '$$this.username'
            }
          }
        },
        posts: '$posts'
      }
    }
  ])

  const community = result[0]

  if (!community) {
    throw new NotFound('No community by that id')
  }

  if (!showBlockedCommunities && community.isBlocked) {
    throw new Unauthorized('This community has been blocked by an admin')
  }

  return community
}

async function addModerator(communityId: string, userId: string) {
  const existingRole = await CommunityAdminModel.exists({
    userId: new Types.ObjectId(userId),
    'roles.communityId': new Types.ObjectId(communityId)
  })

  if (existingRole) {
    return false
  }

  const result = await CommunityAdminModel.updateOne(
    { userId: new Types.ObjectId(userId) },
    {
      $push: {
        roles: {
          communityId: new Types.ObjectId(communityId),
          role: 'moderator'
        }
      }
    },
    { upsert: true }
  )

  return !!(result.modifiedCount || result.upsertedCount)
}

async function removeModerator(communityId: string, userId: string) {
  const result = await CommunityAdminModel.updateOne(
    {
      userId: new Types.ObjectId(userId),
      communityId: new Types.ObjectId(communityId)
    },
    {
      $pull: {
        roles: {
          role: 'moderator'
        }
      }
    }
  )
  return !!result.modifiedCount
}

async function deleteCommunityById(id: string) {
  const userCommunityResult = await UserCommunityModel.updateMany(
    {},
    {
      $pull: {
        communities: {
          communityId: new Types.ObjectId(id)
        }
      }
    }
  )

  const communityResult = await CommunityModel.deleteOne({
    _id: new Types.ObjectId(id)
  })

  const communityAdminResult = await CommunityAdminModel.updateMany(
    {},
    {
      $pull: {
        roles: {
          communityId: new Types.ObjectId(id)
        }
      }
    }
  )

  return {
    isCommunityDeleted: communityResult.acknowledged,
    isUserCommunityDeleted: userCommunityResult.acknowledged,
    isCommunityAdminDeleted: communityAdminResult.acknowledged
  }
}

async function getIdOfAllCommunitiesOwnedByUserId(userId: string) {
  const communityAdminDoc = await CommunityAdminModel.findOne({
    userId: userId,
    'roles.role': 'admin'
  })

  if (!communityAdminDoc) {
    return []
  }

  const listOfCommunityId: Types.ObjectId[] = []

  communityAdminDoc._doc.roles.map((userRole) => {
    if (userRole.role === 'admin') {
      listOfCommunityId.push(userRole.communityId)
    }
  })

  return listOfCommunityId
}

async function deleteCommunitiesOwnedByUserId(userId: string) {
  const communitiesToDelete = await getIdOfAllCommunitiesOwnedByUserId(userId)

  if (communitiesToDelete.length <= 0) {
    return 0
  }

  const numberOfDeletedCommunities = await CommunityModel.deleteMany({
    _id: { $in: communitiesToDelete }
  })
  return numberOfDeletedCommunities.deletedCount
}

async function addCommunityMember(communityId: string, userId: string) {
  const user = await UserModel.findOne({ _id: userId })

  const existing = await CommunityModel.exists({
    _id: communityId,
    'members.userId': userId
  })

  if (existing) {
    return false
  }

  const result = await CommunityModel.updateOne(
    {
      _id: communityId
    },
    {
      $push: {
        members: {
          userId: new Types.ObjectId(userId),
          username: user?._doc.username
        }
      }
    }
  )

  return result.acknowledged
}

async function removeCommunityMember(communityId: string, userId: string) {
  const result = await CommunityModel.updateOne(
    { _id: communityId },
    {
      $pull: {
        members: {
          userId: new Types.ObjectId(userId)
        }
      }
    }
  )
  return result.modifiedCount === 1
}

const CommunityService = {
  saveNewCommunity,
  getAllCommunities,
  findCommunityById,
  addModerator,
  removeModerator,
  deleteCommunityById,
  deleteCommunitiesOwnedByUserId,
  addCommunityMember,
  removeCommunityMember
}

export default CommunityService
