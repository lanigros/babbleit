import Image from 'next/image'
import { MouseEvent } from 'react'

import Thumbnail from '../../public/Thumbnail.jpg'
import OptionMenu from '../OptionMenu'
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
  MenuHolder
} from './InfoCard.styled'

type CardProps = {
  title: string
  description: string
  showFooter?: boolean
  showImage?: boolean
  allowDelete?: boolean
  allowEdit?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
  onEdit?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function InfoCard({
  title,
  description,
  showFooter = false,
  showImage = false,
  allowDelete = false,
  allowEdit = false,
  onClick,
  onDelete,
  onEdit
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
        {((allowEdit && onEdit) || (allowDelete && onDelete)) && (
          <MenuHolder>
            <OptionMenu onDelete={onDelete} onEdit={onEdit} />
          </MenuHolder>
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
