import { Types } from 'mongoose'

import { Unauthorized, NotFound } from '../../errors'
import { Community, CommunityData, CommunitySelect } from '../../types'
import { CommunityModel } from '../model'

async function saveNewCommunity(newCommunity: {
  title: string
  description: string
}): Promise<CommunityData> {
  const { title, description } = newCommunity

  const community = new CommunityModel({
    title,
    description
  })

  const savedCommunity = await community.save()

  const {
    _id: id,
    title: savedTitle,
    description: savedDescription
  } = savedCommunity._doc

  return { id, title: savedTitle, description: savedDescription }
}

async function getAllCommunities(): Promise<CommunityData[]> {
  const communities = await CommunityModel.find<CommunitySelect>({
    isBlocked: false
  }).select('id title description')

  return communities.map((community) => {
    return {
      id: community._id,
      title: community.title,
      description: community.description
    }
  })
}

//TODO: add posts and members when fetching a community
async function findCommunityById(
  communityId: string,
  showBlockedCommunities?: boolean
): Promise<CommunityData> {
  const result = await CommunityModel.aggregate<
    CommunitySelect & Pick<Community, 'isBlocked'> & { id: string; members: [] }
  >([
    { $match: { _id: new Types.ObjectId(communityId) } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'communitymembers',
        localField: '_id',
        foreignField: 'communityId',
        as: 'members'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'members.userId',
        foreignField: '_id',
        as: 'members.user'
      }
    },
    { $limit: 1 },
    {
      $project: {
        id: { $toString: '$_id' },
        title: 1,
        description: 1,
        isBlocked: 1,
        'members.id': { $toString: '$_id' },
        'members.isBlocked': 1,
        'members.userId': 1,
        'members.username': { $first: '$members.user.username' }
      }
    }
  ])

  //communityId '6250667ce96043fc0c439d1b'
  console.log('result', result)

  const community = result[0]

  if (!community) {
    console.log('nooooo')
    throw new NotFound('No community by that id')
  }

  if (!showBlockedCommunities && community.isBlocked) {
    console.log('yeeeeee')
    throw new Unauthorized('This community has been blocked by an admin')
  }

  const { id, title, description, isBlocked, members } = community

  return { id, title, description, isBlocked: !!isBlocked, members }
}

const CommunityService = {
  saveNewCommunity,
  getAllCommunities,
  findCommunityById
}

export default CommunityService
