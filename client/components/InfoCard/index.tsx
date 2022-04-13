import {
  CardContainer,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardTextContainer,
  CardFooterContent,
  CardThumbnail,
  PlaceholderIcons
} from './InfoCard.styled'

import Image from 'next/image'
import Thumbnail from '../../public/Thumbnail.jpg'
type CardProps = {
  title: string
  description: string
}

export default function InfoCard({ title, description }: CardProps) {
  return (
    <CardContainer>
      <CardContent>
        <CardThumbnail>
          <Image
            src={Thumbnail}
            alt='Thumbnail'
            height={70}
            width={70}
            layout='intrinsic'
          />
        </CardThumbnail>
        <CardTextContainer>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardTextContainer>
      </CardContent>
      <CardFooter>
        <CardFooterContent>
          <PlaceholderIcons>&#128077;</PlaceholderIcons>
          <PlaceholderIcons>&#128078;</PlaceholderIcons>
          <PlaceholderIcons>&#11088;</PlaceholderIcons>
        </CardFooterContent>
      </CardFooter>
    </CardContainer>
  )
}
