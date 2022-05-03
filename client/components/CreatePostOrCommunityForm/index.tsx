import { FormEvent } from 'react'
import {
  BannerTitle,
  ErrorText,
  FormWrapper
} from './CreatePostOrCommunity.styled'

type CreateFormProps = {
  children: JSX.Element[]
  handleSubmit: (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => void
  error?: string
  errorText?: string
  buttonText: string
  type: 'community' | 'post'
}

export default function CreatePostOrCommunityForm({
  children,
  handleSubmit,
  buttonText,
  error,
  type
}: CreateFormProps) {
  return (
    <>
      <div>
        <BannerTitle>
          <span>Create</span> {type}
        </BannerTitle>
      </div>
      <FormWrapper>
        {children}
        <button onClick={handleSubmit}>{buttonText}</button>
        {error && <ErrorText>{error}</ErrorText>}
      </FormWrapper>
    </>
  )
}
