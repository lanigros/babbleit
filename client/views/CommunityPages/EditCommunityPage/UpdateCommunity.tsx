import { useRouter } from 'next/router'
import { useState } from 'react'

import { apiPostNewCommunity, apiPutCommunity } from '../../../api'
import { Input, TextArea } from '../../../components'
import { useForm } from '../../../hooks/useForm'
import { CommunityRegistration, DetailedCommunity } from '../../../types'
import { validateCommunity } from '../../../validation/communityValidation'

import { EditCommunityForm, ErrorText } from './EditCommunity.styled'

type EditCommunityProps = {
  community: DetailedCommunity
}

export default function UpdateCommunity({ community }: EditCommunityProps) {
  const router = useRouter()

  const [error, setError] = useState(false)

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      title: community.title,
      description: community.description
    },
    submitHandler,
    validateCommunity
  )

  async function submitHandler(updatedCommunity: CommunityRegistration) {
    error && setError(false)
    async function postNewCommunity() {
      try {
        /* const response = await apiPutCommunity({
          data: updatedCommunity
        }) */
        console.log(updatedCommunity)
      } catch (e) {
        setError(true)
      }
    }
    return postNewCommunity()
  }

  return (
    <>
      <EditCommunityForm>
        <Input
          name='title'
          value={values.title}
          onChange={handleChange}
          errorText={errors.title}
          variant={'round'}
        />
        <TextArea
          name='description'
          value={values.description}
          onChange={handleChange}
          errorText={errors.description}
          variant={'round'}
        />
        <button onClick={handleSubmit}>Update community</button>
        {error && <ErrorText>Something went wrong</ErrorText>}
      </EditCommunityForm>
    </>
  )
}
