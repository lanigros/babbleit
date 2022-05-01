import { ModalContainer } from './Modal.styled'

type ModalProps = {
  children: JSX.Element | JSX.Element[]
}

export default function Modal({ children }: ModalProps) {
  return <ModalContainer>{children}</ModalContainer>
}
