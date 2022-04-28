import { Button } from './createCommunityButton.styled'
import Link from 'next/link'

export default function ExploreButton() {
  return (
    <Link href={'/create-community'}>
      <Button>
        <span>&#x271A;</span>
        <p>Create community</p>
      </Button>
    </Link>
  )
}
