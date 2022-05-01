import { Dispatch, SetStateAction, useContext, useEffect } from 'react'

import { DetailedCommunity } from '../../types'
import { apiAddMember, apiGetUsers } from '../../api'
import { CardList } from '../../components'
import { GlobalContext } from '../../state/globalState'
import UserCard from '../UserCard'
import CenteredModal from '../../components/CenteredModal'

type ModalProps = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  community: DetailedCommunity
}

export default function AddMemberModal({
  showModal,
  setShowModal,
  community
}: ModalProps) {
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    async function fetchUsers() {
      const usersResponse = await apiGetUsers()
      dispatch({ type: 'setUsers', payload: usersResponse.users })
    }
    fetchUsers()
  }, [dispatch])

  return showModal ? (
    <CenteredModal setShowModal={setShowModal}>
      <CardList>
        {state.users?.length ? (
          state.users.map((user) => {
            if (community.members.find((member) => member.userId === user.id)) {
              return null
            }

            async function addMember() {
              try {
                const response = await apiAddMember({
                  slug: `${community.id}/members`,
                  data: { userId: user.id }
                })
                if (response) {
                  setShowModal(false)
                }
              } catch (e) {
                console.log('oopsie')
              }
            }

            return (
              <UserCard
                {...user}
                key={user.id}
                onCustomButtonClick={addMember}
                customButtonText={'Add member'}
              />
            )
          })
        ) : (
          <div>No Users to add as members :(</div>
        )}
      </CardList>
    </CenteredModal>
  ) : null
}
