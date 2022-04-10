import SignupForm from '../../components/LoginOrSignup'
import Input from '../../components/Input'
import { useForm } from '../../hooks/useForm'
import { validateLogin } from '../../validation/userValidation'

export default function Signup() {
  function submitHandler() {
    console.log('submitting')
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    },
    submitHandler,
    validateLogin
  )

  return (
    <SignupForm
      title={'Sign up'}
      buttonText={`Let's go!`}
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
