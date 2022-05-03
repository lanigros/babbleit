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
  const communityId = router.query.slug

  const [error, setError] = useState<string | undefined>()

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      title: communityToBeEdited ? communityToBeEdited.title : '',
      description: communityToBeEdited ? communityToBeEdited.description : ''
    },
    submitHandler,
    validateCommunity
  )

  async function submitHandler(newCommunity: CommunityRegistration) {
    error && setError(undefined)

    if (communityToBeEdited) {
      await updateCommunity(newCommunity)
    } else {
      await createNewCommunity(newCommunity)
    }
  }

  async function createNewCommunity(newCommunity: CommunityRegistration) {
    try {
      const response = await apiPostNewCommunity({
        data: newCommunity
      })
      router.push(`communities/${response.community.id}`)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }
  async function updateCommunity(editedCommunity: CommunityRegistration) {
    try {
      const response = await apiPutCommunity({
        data: editedCommunity,
        slug: `/${communityId}`
      })
      response.message && router.back()
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }

  return (
    <CreatePostOrCommunityForm
      handleSubmit={handleSubmit}
      buttonText={communityToBeEdited ? 'Update community' : 'Create community'}
      error={error}
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
