import Image from 'next/image'
import { MouseEvent } from 'react'

import remove from '../../public/recycle-bin.png'
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
  PlaceholderIcons,
  RemovalButton
} from './InfoCard.styled'

type CardProps = {
  title: string
  description: string
  showFooter?: boolean
  showImage?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  allowRemoval?: boolean
  onRemoval?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function InfoCard({
  title,
  description,
  showFooter = false,
  showImage = false,
  onClick,
  allowRemoval = false,
  onRemoval
}: CardProps) {
  return (
    <CardContainer>
      <CardContent>
        {showImage && (
          <CardThumbnail onClick={onClick}>
            <Image
              src={Thumbnail}
              alt='Thumbnail'
              height={70}
              width={70}
              layout='intrinsic'
            />
          </CardThumbnail>
        )}
        <CardTextContainer onClick={onClick}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardTextContainer>
        {allowRemoval && (
          <RemovalButton onClick={onRemoval}>
            <span>
              <Image
                src={remove}
                width={50}
                height={50}
                layout='intrinsic'
                alt='Icon of a trashcan'
              />
            </span>
          </RemovalButton>
        )}
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
