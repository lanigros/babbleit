import SignupForm from '../../components/LoginOrSignup'
import Input from '../../components/Input'
import { useForm } from '../../hooks/useForm'
import { validateSignup } from '../../validation/userValidation'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../state/globalState'
import { UserSignup } from '../../types'
import { apiSignup } from '../../api/authApi'
import { useRouter } from 'next/router'

export default function Signup() {
  const router = useRouter()
  const { dispatch } = useContext(GlobalContext)

  const [error, setError] = useState<string>('')

  function submitHandler({ repeatPassword, ...signupValues }: UserSignup) {
    async function postLogin() {
      try {
        const response = await apiSignup({ data: signupValues })
        response.user && dispatch({ type: 'user', payload: response.user })
        router.push('/profile')
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
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    },
    submitHandler,
    validateSignup
  )

  return (
    <SignupForm
      title={'Sign up'}
      buttonText={`Let's go!`}
      onSubmit={handleSubmit}
      isSubmitDisabled={Object.keys(errors).length !== 0}
      linkText={'Or login here'}
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
