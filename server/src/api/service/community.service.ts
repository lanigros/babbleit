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

const CommunityService = {
  saveNewCommunity
}

export default CommunityService
