import { useRouter } from 'next/router'
import { useState } from 'react'
import { apiPostNewCommunityPost, apiUpdateCommunityPost } from '../../api'
import { Input, TextArea } from '../../components'
import CreatePostOrCommunityForm from '../../components/CreatePostOrCommunityForm'
import { useForm } from '../../hooks/useForm'
import { Id, Post, PostCreation } from '../../types'
import { validateCommunityPost } from '../../validation/postValidation'

type PostFormProps = {
  currentPost?: Post
}

export default function PostForm({ currentPost }: PostFormProps) {
  const router = useRouter()
  const communityId = router.query.slug

  const [error, setError] = useState(false)

  const initialValues = currentPost || { title: '', content: '' }

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    submitHandler,
    validateCommunityPost
  )

  async function submitHandler(post: PostCreation & Partial<Id>) {
    error && setError(false)
    async function postNewCommunity() {
      try {
        const response = post.id
          ? await apiUpdateCommunityPost({
              data: { title: post.title, content: post.content },
              slug: `/${communityId}/posts/${post.id}`
            })
          : await apiPostNewCommunityPost({
              data: post,
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
