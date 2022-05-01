import { useRouter } from 'next/router'
import { useState } from 'react'
import { apiPostNewCommunity } from '../../api'
import CreatePostOrCommunityForm from '../../components/CreatePostOrCommunityForm'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import { useForm } from '../../hooks/useForm'
import { CommunityRegistration } from '../../types'
import { validateCommunity } from '../../validation/communityValidation'

export default function CreateCommunityForm() {
  const router = useRouter()

  const [isError, setIsError] = useState(false)

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      title: '',
      description: ''
    },
    submitHandler,
    validateCommunity
  )

  async function submitHandler(newCommunity: CommunityRegistration) {
    isError && setIsError(false)

    async function postNewCommunity() {
      try {
        const response = await apiPostNewCommunity({
          data: newCommunity
        })
        router.push(`communities/${response.community.id}`)
      } catch (e) {
        setIsError(true)
      }
    }
    return postNewCommunity()
  }

  return (
    <CreatePostOrCommunityForm
      handleSubmit={handleSubmit}
      buttonText={'Create community'}
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
