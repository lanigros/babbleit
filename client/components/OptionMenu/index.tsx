import { useState, MouseEvent } from 'react'
import {
  IconSpan,
  MenuOptions,
  Option,
  OptionMenuM,
  OptionMenuWrapper
} from './OptionMenu.styled'

type OptionMenuProps = {
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void
  onEdit?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function OptionMenu({ onDelete, onEdit }: OptionMenuProps) {
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
          {onEdit && <Option onClick={onEdit}>edit</Option>}
          {onDelete && (
            <Option onClick={onDelete} danger>
              delete
            </Option>
          )}
        </MenuOptions>
      )}
    </OptionMenuWrapper>
  )
}
