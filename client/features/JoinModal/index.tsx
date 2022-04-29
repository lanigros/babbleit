import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { apiJoinCommunity } from '../../api'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import {
  ButtonContainer,
  ErrorWrapper,
  JoinWrapper,
  MainContent,
  Message
} from './JoinModal.styled'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function JoinModal({ showModal, setShowModal }: ModalProps) {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  async function joinCommunity() {
    try {
      await apiJoinCommunity({ slug: `${router.query.slug}/join` })
    } catch (e) {
      setIsError(true)
    }
  }

  return showModal ? (
    <Modal>
      <JoinWrapper>
        <MainContent>
          <Message>
            You must be a member to participate in this community
          </Message>
          <ButtonContainer>
            <Button onClick={() => setShowModal(false)}>Dismiss</Button>
            <Button onClick={joinCommunity}>Join community</Button>
          </ButtonContainer>
          {isError && <ErrorWrapper>Something went wrong</ErrorWrapper>}
        </MainContent>
      </JoinWrapper>
    </Modal>
  ) : null
}
