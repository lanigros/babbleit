import { GetServerSidePropsContext } from 'next'
import { apiGetCommunities } from '../../api'
import { Community } from '../../types'
import { CommunitiesView } from '../../views'

type CommunitiesProps = {
  communities?: Community[]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let fetchedCommunities: any = {}

  try {
    const communityResponse = await apiGetCommunities(ctx.req.cookies)
    fetchedCommunities = communityResponse.communities
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      communities: fetchedCommunities
    }
  }
}

export const Communities = ({ communities }: CommunitiesProps) => {
  return (
    <main>
      <CommunitiesView communities={communities} />
    </main>
  )
}

export default Communities
