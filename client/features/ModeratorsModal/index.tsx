import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { apiGetModerators, apiRemoveModerator } from '../../api'
import { CardList } from '../../components'
import CenteredModal from '../../components/CenteredModal'
import { CommunityAdminRole, Moderator } from '../../types'
import UserCard from '../UserCard'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function ModeratorsModal({
  showModal,
  setShowModal
}: ModalProps) {
  const router = useRouter()

  const [moderators, setModerators] = useState<Moderator[]>([])
  const [communityAdminRole, setCommunityAdminRole] =
    useState<CommunityAdminRole>()

  useEffect(() => {
    async function fetchModerators() {
      const moderatorsResponse = await apiGetModerators({
        slug: `${router.query.slug}/moderators`
      })
      setModerators(moderatorsResponse.moderators)
      setCommunityAdminRole(moderatorsResponse.communityAdminRole)
    }
    fetchModerators()
  }, [router.query.slug])

  async function removeModerator(moderator: Moderator) {
    try {
      const response = await apiRemoveModerator({
        slug: `${router.query.slug}/moderators/${moderator.userId}`
      })

      if (!response) {
        return
      }

      const indexToUpdate = moderators.findIndex(
        (mod) => mod.userId === moderator.userId
      )
      const updatedModerators = [...moderators]
      updatedModerators.splice(indexToUpdate, 1)
      setModerators(updatedModerators)
    } catch (e) {
      console.log('oopsie')
    }
  }

  return showModal ? (
    <CenteredModal setShowModal={setShowModal}>
      <CardList>
        {moderators.map((moderator) => (
          <UserCard
            key={moderator.userId}
            id={moderator.userId}
            username={moderator.username}
            onCustomButtonClick={() => removeModerator(moderator)}
            customButtonText={
              communityAdminRole === 'admin' && moderator.role === 'moderator'
                ? 'Remove moderator'
                : undefined
            }
          />
        ))}
      </CardList>
    </CenteredModal>
  ) : null
}
