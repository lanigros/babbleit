import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { apiDeleteMyAccount } from '../../api'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

import {
  ButtonContainer,
  ErrorWrapper,
  DeleteWrapper,
  MainContent,
  Message
} from './DeleteMyAccountModal.styled'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function DeleteMyAccountModal({
  showModal,
  setShowModal
}: ModalProps) {
  const router = useRouter()
  const [isError, setIsError] = useState(false)

  async function deleteMe() {
    try {
      await apiDeleteMyAccount()
      setShowModal(false)
    } catch (e) {
      setIsError(true)
    }
    router.reload()
    return
  }

  return showModal ? (
    <Modal>
      <DeleteWrapper>
        <MainContent>
          <Message>Are you sure?</Message>
          <ButtonContainer>
            <Button onClick={() => setShowModal(false)}>Dismiss</Button>
            <Button onClick={deleteMe}>Yes</Button>
          </ButtonContainer>
          {isError && <ErrorWrapper>Something went wrong</ErrorWrapper>}
        </MainContent>
      </DeleteWrapper>
    </Modal>
  ) : null
}
