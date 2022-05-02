import { useState, MouseEvent } from 'react'
import {
  IconSpan,
  MenuOptions,
  Option,
  OptionMenuM,
  OptionMenuWrapper
} from './OptionMenu.styled'

export type EditProps = {
  allowDelete?: boolean
  allowEdit?: boolean
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
  onEdit?: (e: MouseEvent<HTMLButtonElement>) => void
  isBlocked?: 1 | 0
  onChangeBlocked?: (e: MouseEvent<HTMLButtonElement>) => void
  allowChangeBlocked?: boolean
  customButtonText?: string
  onCustomButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function OptionMenu({
  onDelete,
  onEdit,
  allowDelete,
  allowEdit,
  allowChangeBlocked,
  onChangeBlocked,
  isBlocked,
  customButtonText,
  onCustomButtonClick
}: EditProps) {
  const [isMenuActive, setIsMenuActive] = useState(false)
  return (
    <OptionMenuWrapper onPointerLeave={() => setIsMenuActive(false)}>
      <OptionMenuM
        isActive={isMenuActive}
        onPointerEnter={() => setIsMenuActive(true)}
      >
        <IconSpan>&#x270E;</IconSpan>
      </OptionMenuM>
      {isMenuActive && (
        <MenuOptions>
          {customButtonText && onCustomButtonClick && (
            <Option onClick={onCustomButtonClick}>{customButtonText}</Option>
          )}
          {onEdit && allowEdit && <Option onClick={onEdit}>edit</Option>}
          {onDelete && allowDelete && (
            <Option onClick={onDelete} danger>
              delete
            </Option>
          )}
          {allowChangeBlocked && onChangeBlocked && (
            <Option onClick={onChangeBlocked}>
              {isBlocked ? 'unblock' : 'block'}
            </Option>
          )}
        </MenuOptions>
      )}
    </OptionMenuWrapper>
  )
}
