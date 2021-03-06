import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { LoginOrSignup as LoginForm, Input } from '../../components'
import { useForm } from '../../hooks/useForm'
import { validateLogin } from '../../validation/userValidation'
import { apiLogin } from '../../api/authApi'
import { GlobalContext } from '../../state/globalState'
import { UserLogin } from '../../types'

export default function Login() {
  const router = useRouter()
  const { dispatch } = useContext(GlobalContext)

  const [error, setError] = useState(false)

  function submitHandler(userLogin: UserLogin) {
    error && setError(false)
    async function postLogin() {
      try {
        const response = await apiLogin({ data: userLogin })
        response.user && dispatch({ type: 'user', payload: response.user })
        router.push('/profile')
      } catch (e) {
        setError(true)
      }
    }
    return postLogin()
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    submitHandler,
    validateLogin
  )

  return (
    <LoginForm
      title={'Login'}
      buttonText={'Log me in!'}
      onSubmit={handleSubmit}
      isSubmitDisabled={Object.keys(errors).length !== 0}
      linkText={'Or signup here'}
      linkUrl={'/signup'}
      isSuccessful={!error}
      errorMessage={'Invalid email or password'}
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
        label={'Password'}
        name={'password'}
        type={'password'}
        value={values.password}
        errorText={errors.password}
        onChange={handleChange}
        variant={'round'}
      />
    </LoginForm>
  )
}
