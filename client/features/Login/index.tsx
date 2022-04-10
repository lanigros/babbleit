import LoginForm from '../../components/LoginOrSignup'
import Input from '../../components/Input'
import { useForm } from '../../hooks/useForm'
import { validateLogin } from '../../validation/userValidation'

export default function Login() {
  function submitHandler() {
    console.log('submitting')
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
      buttonText={`Log me in!`}
      onSubmit={handleSubmit}
      isSubmitDisabled={Object.keys(errors).length !== 0}
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
