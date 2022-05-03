import SignupForm from '../../components/LoginOrSignup'
import Input from '../../components/Input'
import { useForm } from '../../hooks/useForm'
import { validateSignup } from '../../validation/userValidation'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../state/globalState'
import { User, UserSignup } from '../../types'
import { useRouter } from 'next/router'
import { apiUpdateProfile, apiSignup } from '../../api'

type SignupOrUpdateProps = {
  currentUser?: Partial<User>
  onSubmit?: () => void
}

export default function SignupOrUpdateProfile({
  currentUser,
  onSubmit
}: SignupOrUpdateProps) {
  const router = useRouter()
  const { dispatch } = useContext(GlobalContext)

  const [error, setError] = useState<string>('')

  function submitHandler({ repeatPassword, ...userValues }: UserSignup) {
    async function postLogin() {
      try {
        const response = currentUser
          ? await apiUpdateProfile({ data: userValues })
          : await apiSignup({ data: userValues })

        onSubmit && onSubmit()
        response.user && dispatch({ type: 'user', payload: response.user })
        router.asPath !== '/profile' && router.push('/profile')
      } catch (e) {
        if (e instanceof Error && e.message.length > 0) {
          setError(e.message)
          return
        }
        setError('Something went wrong')
      }
    }
    return postLogin()
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      email: currentUser?.email || '',
      username: currentUser?.username || '',
      password: '',
      repeatPassword: ''
    },
    submitHandler,
    validateSignup
  )

  return (
    <SignupForm
      title={currentUser ? 'Update profile' : 'Sign up'}
      buttonText={`Let's go!`}
      onSubmit={handleSubmit}
      isSubmitDisabled={Object.keys(errors).length !== 0}
      linkText={currentUser ? undefined : 'Or login here'}
      linkUrl={'/'}
      isSuccessful={error.length === 0}
      errorMessage={error}
    >
      <Input
        label={'Email'}
        name={'email'}
        value={values.email}
        errorText={errors.email}
        onChange={handleChange}
        variant={'round'}
      />
      <Input
        label={'Username'}
        name={'username'}
        value={values.username}
        errorText={errors.username}
        onChange={handleChange}
        variant={'round'}
      />
      <Input
        label={'Password'}
        name={'password'}
        type={'password'}
        value={values.password}
        errorText={errors.password}
        onChange={handleChange}
        variant={'round'}
      />
      <Input
        label={'Repeat password'}
        name={'repeatPassword'}
        type={'password'}
        value={values.repeatPassword}
        errorText={errors.repeatPassword}
        onChange={handleChange}
        variant={'round'}
      />
    </SignupForm>
  )
}
