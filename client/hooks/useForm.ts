import {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  FormEvent
} from 'react'

export type FormValueObject = { [key: string]: string }

type FormValues<Initial extends FormValueObject> = {
  values: Initial
  errors: Partial<Initial>
  setErrors: Dispatch<SetStateAction<Partial<Initial>>>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => void
}

export function useForm<
  InitialValue extends FormValueObject,
  S extends () => void,
  V extends (values: InitialValue) => Partial<InitialValue>
>(
  initialValue: InitialValue,
  submitForm: S,
  validate?: V
): FormValues<InitialValue> {
  const [values, setValues] = useState({ ...initialValue })
  const [errors, setErrors] = useState<Partial<InitialValue>>({})

  const handleSubmit = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    const validationErrors = (validate && validate(values)) || {}
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors)
      return
    }
    submitForm()
    setValues({ ...initialValue })
    setErrors({})
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    if (!validate || Object.keys(errors).length === 0) return

    const unadressedErrors = { ...errors }
    delete unadressedErrors[e.target.name]
    setErrors(unadressedErrors)
  }

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit
  }
}
