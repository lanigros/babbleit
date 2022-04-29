import { useRouter } from 'next/router'
import { useState } from 'react'
import { apiPostNewCommunityPost } from '../../api'
import { Input, TextArea } from '../../components'
import CreatePostOrCommunityForm from '../../components/CreatePostOrCommunityForm'
import { useForm } from '../../hooks/useForm'
import { PostCreation } from '../../types'
import { validateCommunityPost } from '../../validation/postValidation'

export default function CreatePostForm() {
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
        const response = await apiPostNewCommunityPost({
          data: newPost,
          slug: `/${communityId}/posts`
        })
        if (response) {
          router.back()
        }
      } catch (e) {
        setError(true)
      }
    }
    return postNewCommunity()
  }
  return (
    <CreatePostOrCommunityForm
      handleSubmit={handleSubmit}
      type={'post'}
      buttonText={'Create post'}
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
        name='content'
        placeholder="Whats's on your mind?"
        value={values.content}
        onChange={handleChange}
        errorText={errors.content}
        variant={'round'}
      />
    </CreatePostOrCommunityForm>
  )
}
