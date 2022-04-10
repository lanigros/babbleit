import { MouseEvent } from 'react'

import { Button, LoginWrapper, Title } from './LoginOrSignupstyled'

type LoginComponentProps = {
  title: string
  buttonText: string
  children: JSX.Element[]
  isSubmitDisabled: boolean
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function LoginForm({
  title,
  buttonText,
  children,
  isSubmitDisabled,
  onSubmit
}: LoginComponentProps) {
  return (
    <LoginWrapper>
      <Title>{title}</Title>
      {children}
      <Button onClick={onSubmit} disabled={isSubmitDisabled}>
        {buttonText}
      </Button>
    </LoginWrapper>
  )
}
