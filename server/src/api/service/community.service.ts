import { CommunityData, CommunitySelect } from '../../types'
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
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const CommunityService = {
  saveNewCommunity,
  getAllCommunities
}

export default CommunityService
