import { useRouter } from 'next/router'
import { useState } from 'react'
import { apiPostNewCommunity, apiPutCommunity } from '../../api'
import CreatePostOrCommunityForm from '../../components/CreatePostOrCommunityForm'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { useForm } from '../../hooks/useForm'
import { CommunityRegistration } from '../../types'
import { validateCommunity } from '../../validation/communityValidation'

type CreateCommunityFormProps = {
  communityToBeEdited?: CommunityRegistration
}

export default function CreateCommunityForm({
  communityToBeEdited
}: CreateCommunityFormProps) {
  const router = useRouter()
  const communityId = router.query.slug // NEW

  const [isError, setIsError] = useState(false)

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      title: communityToBeEdited ? communityToBeEdited.title : '',
      description: communityToBeEdited ? communityToBeEdited.description : ''
    },
    submitHandler,
    validateCommunity
  )

  async function submitHandler(newCommunity: CommunityRegistration) {
    isError && setIsError(false)

    if (communityToBeEdited) {
      return updateCommunity(newCommunity)
    } else {
      return createNewCommunity(newCommunity)
    }
  }

  async function createNewCommunity(newCommunity: CommunityRegistration) {
    try {
      const response = await apiPostNewCommunity({
        data: newCommunity
      })
      router.push(`communities/${response.community.id}`)
    } catch (e) {
      setIsError(true)
    }
  }
  async function updateCommunity(editedCommunity: CommunityRegistration) {
    console.log('updating!')

    try {
      const response = await apiPutCommunity({
        data: editedCommunity,
        slug: `/${communityId}`
      })
      console.log(response)

      //router.push(`communities/${response.id}`)
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <CreatePostOrCommunityForm
      handleSubmit={handleSubmit}
      buttonText={communityToBeEdited ? 'Update community' : 'Create community'}
      isError={isError}
      type={'community'}
    >
      <Input
        name='title'
        placeholder='Title'
        value={values.title}
        onChange={handleChange}
        errorText={errors.title}
        variant={'round'}
      />
      <TextArea
        name='description'
        placeholder='Description'
        value={values.description}
        onChange={handleChange}
        errorText={errors.description}
        variant={'round'}
      />
    </CreatePostOrCommunityForm>
  )
}
