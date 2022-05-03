import { Button } from './createCommunityButton.styled'
import Link from 'next/link'

export default function CreateCommunityButton() {
  return (
    <Link href={'/create-community'} passHref>
      <Button>
        <span>&#x271A;</span>
        <p>Create community</p>
      </Button>
    </Link>
  )
}
