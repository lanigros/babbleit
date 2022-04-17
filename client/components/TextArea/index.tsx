import { ChangeEvent } from 'react'
import {
  TextAreaWrapper,
  Input,
  ErrorWrapper,
  InputStyleProps,
  FieldSet
} from './Input.styled'

type InputProps = {
  name: string
  value: string
  placeholder?: string
  errorText?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & InputStyleProps

export default function TextAreaComponent({
  name,
  value,
  placeholder,
  errorText,
  onChange
}: InputProps) {
  return (
    <TextAreaWrapper>
      <FieldSet variant={'round'} isError={!!errorText}>
        <Input
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          isError={!!errorText}
        />
      </FieldSet>
      {errorText && (
        <ErrorWrapper>
          <p>{errorText}</p>
        </ErrorWrapper>
      )}
    </TextAreaWrapper>
  )
}
