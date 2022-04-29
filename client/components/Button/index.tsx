import { MouseEvent } from 'react'
import { ButtonWrapper, DangerProps } from './Button.styled'

type ButtonProps = {
  children: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
} & DangerProps

export default function Button({ children, onClick }: ButtonProps) {
  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
}
