import { CommunityModel } from '../model'

async function saveNewCommunity(newCommunity: {
  title: string
  description: string
}) {
  const { title, description } = newCommunity

  const community = new CommunityModel({
    title,
    description
  })

  const savedCommunity = await community.save()
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, ...communityResponse } = savedCommunity._doc
  return { id: _id, ...communityResponse }
}

//get all communities
async function getAllCommunities() {
  //TODO fetch all communities from db
  return await CommunityModel.find()

  //create a filter that returns only non-blocked communities
}

const CommunityService = {
  saveNewCommunity,
  getAllCommunities
}

export default CommunityService
