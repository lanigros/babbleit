import { Dispatch, SetStateAction } from 'react'
import { CloseButton } from '../../features/ModeratorsModal/ModeratorsModal.styled'
import Modal from '../Modal'
import { CenteredModalWrapper } from './CenteredModal.styled'

type CenteredModalProps = {
  children: JSX.Element | JSX.Element[]
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function CenteredModal({
  setShowModal,
  children
}: CenteredModalProps) {
  return (
    <Modal>
      <CenteredModalWrapper>
        <CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
        {children}
      </CenteredModalWrapper>
    </Modal>
  )
}
