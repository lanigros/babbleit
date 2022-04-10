import { ChangeEvent } from 'react'
import {
  Label,
  InputWrapper,
  Input,
  ErrorWrapper,
  FieldSet,
  InputStyleProps
} from './Input.styled'

type InputProps = {
  name: string
  value: string
  type?: string
  placeholder?: string
  label?: string
  errorText?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & InputStyleProps

export default function InputComponent({
  name,
  value,
  type = 'text',
  placeholder,
  label,
  errorText,
  onChange,
  variant
}: InputProps) {
  return (
    <InputWrapper>
      <FieldSet variant={variant} isError={!!errorText}>
        {label && <Label>{label.toUpperCase()}</Label>}
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          variant={variant}
        />
      </FieldSet>
      {errorText && (
        <ErrorWrapper>
          <p>{errorText}</p>
        </ErrorWrapper>
      )}
    </InputWrapper>
  )
}
