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

  return await community.save()
}

const CommunityService = {
  saveNewCommunity
}

export default CommunityService
