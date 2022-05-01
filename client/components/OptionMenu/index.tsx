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
}

export default function OptionMenu({
  onDelete,
  onEdit,
  allowDelete,
  allowEdit
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
          {onEdit && allowEdit && <Option onClick={onEdit}>edit</Option>}
          {onDelete && allowDelete && (
            <Option onClick={onDelete} danger>
              delete
            </Option>
          )}
        </MenuOptions>
      )}
    </OptionMenuWrapper>
  )
}
