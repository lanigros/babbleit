import { useRouter } from 'next/router'
import { useState } from 'react'

import { apiPostNewCommunity } from '../../../api'
import { Input, MaxWidthContainer, TextArea } from '../../../components'
import { useForm } from '../../../hooks/useForm'
import { CommunityRegistration } from '../../../types'
import { validateCommunity } from '../../../validation/communityValidation'

import {
  BannerTitle,
  Banner,
  CreateCommunityForm,
  ErrorText
} from './CreateCommunity.styled'

export default function CreateCommunity() {
  const router = useRouter()

  const [error, setError] = useState(false)

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      title: '',
      description: ''
    },
    submitHandler,
    validateCommunity
  )

  async function submitHandler(newCommunity: CommunityRegistration) {
    error && setError(false)
    async function postNewCommunity() {
      try {
        const response = await apiPostNewCommunity({
          data: newCommunity
        })
        router.push(`communities/${response.community.id}`)
      } catch (e) {
        setError(true)
      }
    }
    return postNewCommunity()
  }

  return (
    <>
      <MaxWidthContainer>
        <Banner>
          <BannerTitle>
            <span>Creating</span> a new community
          </BannerTitle>
        </Banner>
        <CreateCommunityForm>
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
          <button onClick={handleSubmit}>Create new community</button>
          {error && <ErrorText>Something went wrong</ErrorText>}
        </CreateCommunityForm>
      </MaxWidthContainer>
    </>
  )
}
