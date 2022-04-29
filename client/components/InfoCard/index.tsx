import Image from 'next/image'
import { MouseEvent } from 'react'

import Thumbnail from '../../public/Thumbnail.jpg'
import OptionMenu, { EditProps } from '../OptionMenu'
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
  MenuHolder,
  IconWrapper
} from './InfoCard.styled'

type CardProps = {
  title: string
  description: string
  showFooter?: boolean
  showImage?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
} & EditProps

export default function InfoCard({
  title,
  description,
  showFooter = false,
  showImage = false,
  allowDelete = false,
  allowEdit = false,
  allowChangeBlocked = false,
  isBlocked,
  onClick,
  onDelete,
  onEdit,
  onChangeBlocked
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
            <OptionMenu
              allowEdit={allowEdit}
              allowDelete={allowDelete}
              onDelete={onDelete}
              onEdit={onEdit}
              allowChangeBlocked={allowChangeBlocked}
              onChangeBlocked={onChangeBlocked}
              isBlocked={isBlocked}
            />
          </MenuHolder>
        )}
      </CardContent>
      {showFooter && (
        <CardFooter>
          <CardFooterContent isBlocked={!!isBlocked}>
            {isBlocked ? <h5>Blocked</h5> : null}
            <IconWrapper>
              <PlaceholderIcons>&#128077;</PlaceholderIcons>
              <PlaceholderIcons>&#128078;</PlaceholderIcons>
              <PlaceholderIcons>&#11088;</PlaceholderIcons>
            </IconWrapper>
          </CardFooterContent>
        </CardFooter>
      )}
    </CardContainer>
  )
}
