import { useRouter } from 'next/router'
import { useState } from 'react'

import { apiPostNewCommunityPost } from '../../../api'
import { Input, MaxWidthContainer, TextArea } from '../../../components'
import { useForm } from '../../../hooks/useForm'
import { PostCreation } from '../../../types'
import { validateCommunityPost } from '../../../validation/postValidation'
import {
  BannerTitle,
  Banner,
  FormWrapper,
  ErrorText
} from './CreatePost.styled'

export default function CreateNewPost() {
  const router = useRouter()
  const communityId = router.query.slug

  const [error, setError] = useState(false)

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      title: '',
      content: ''
    },
    submitHandler,
    validateCommunityPost
  )

  async function submitHandler(newPost: PostCreation) {
    error && setError(false)
    async function postNewCommunity() {
      try {
        //TODO test this route against the backend route
        /* await apiPostNewCommunityPost({
          data: newPost,
          slug: `/${communityId}/posts`
        }) */
        console.log('Fired post request!')
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
            <span>Creating</span> a new post
          </BannerTitle>
        </Banner>
        <FormWrapper>
          <Input
            name='title'
            placeholder='Title'
            value={values.title}
            onChange={handleChange}
            errorText={errors.title}
            variant={'round'}
          />

          <TextArea
            name='content'
            placeholder="Whats's on your mind?"
            value={values.content}
            onChange={handleChange}
            errorText={errors.content}
            variant={'round'}
          />

          <button onClick={handleSubmit}>Create new post</button>
          {error && <ErrorText>Something went wrong</ErrorText>}
        </FormWrapper>
      </MaxWidthContainer>
    </>
  )
}
