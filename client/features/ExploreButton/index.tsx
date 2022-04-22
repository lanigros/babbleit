import { Button } from './ExploreButton.styled'
import Link from 'next/link'

export default function ExploreButton() {
  return (
    <Link href={'/communities'}>
      <Button>
        <span>&#x25B6;</span>
      </Button>
    </Link>
  )
}
