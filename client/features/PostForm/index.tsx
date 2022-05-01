import { useRouter } from 'next/router'
import { stringify } from 'querystring'
import { useState } from 'react'
import { apiPostNewCommunityPost, apiUpdateCommunityPost } from '../../api'
import { Input, TextArea } from '../../components'
import CreatePostOrCommunityForm from '../../components/CreatePostOrCommunityForm'
import { useForm } from '../../hooks/useForm'
import { CommunityPost, Id, PostCreation } from '../../types'
import { validateCommunityPost } from '../../validation/postValidation'

type PostFormProps = {
  currentPost?: CommunityPost
}

export default function PostForm({ currentPost }: PostFormProps) {
  const router = useRouter()
  const communityId = router.query.slug

  const [isError, setIsError] = useState(false)

  const initialValues = currentPost
    ? { title: currentPost.title, content: currentPost.content }
    : { title: '', content: '' }

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    submitHandler,
    validateCommunityPost
  )

  async function submitHandler(post: PostCreation & Partial<Id>) {
    isError && setIsError(false)
    async function postNewCommunity() {
      try {
        const response = currentPost?.id
          ? await apiUpdateCommunityPost({
              data: post,
              slug: `/${communityId}/posts/${currentPost.id}`
            })
          : await apiPostNewCommunityPost({
              data: post,
              slug: `/${communityId}/posts`
            })

        if (response) {
          router.back()
        }
      } catch (e) {
        setIsError(true)
      }
    }
    return postNewCommunity()
  }

  return (
    <CreatePostOrCommunityForm
      handleSubmit={handleSubmit}
      type={'post'}
      buttonText={currentPost ? 'Edit post' : 'Create post'}
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
