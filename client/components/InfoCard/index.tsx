import Image from 'next/image'
import { MouseEvent } from 'react'

import Thumbnail from '../../public/Thumbnail.jpg'
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

type CardProps = {
  title: string
  description: string
  showFooter?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export default function InfoCard({
  title,
  description,
  showFooter,
  onClick
}: CardProps) {
  return (
    <CardContainer onClick={onClick}>
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
      {showFooter && (
        <CardFooter>
          <CardFooterContent>
            <PlaceholderIcons>&#128077;</PlaceholderIcons>
            <PlaceholderIcons>&#128078;</PlaceholderIcons>
            <PlaceholderIcons>&#11088;</PlaceholderIcons>
          </CardFooterContent>
        </CardFooter>
      )}
    </CardContainer>
  )
}
