import Link from 'next/link'
import { MouseEvent } from 'react'

import {
  Button,
  ErrorText,
  LinkWrapper,
  LoginWrapper,
  Title
} from './LoginOrSignup.styled'

type LoginComponentProps = {
  title: string
  buttonText: string
  children: JSX.Element[]
  isSubmitDisabled: boolean
  linkUrl: string
  linkText: string
  errorMessage: string
  isSuccessful: boolean
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function LoginForm({
  title,
  buttonText,
  children,
  isSubmitDisabled,
  isSuccessful,
  errorMessage,
  linkUrl,
  linkText,
  onSubmit
}: LoginComponentProps) {
  return (
    <LoginWrapper>
      <Title>{title}</Title>
      {children}
      {!isSuccessful && <ErrorText>{errorMessage}</ErrorText>}
      <Button onClick={onSubmit} disabled={isSubmitDisabled}>
        {buttonText}
      </Button>
      <LinkWrapper>
        <Link href={linkUrl}>{linkText}</Link>
      </LinkWrapper>
    </LoginWrapper>
  )
}
