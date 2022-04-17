import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontSizes,
  fontWeights,
  spacings,
  lineHeights
} from '../../global-styles/variables'

type ErrorProps = {
  isError?: boolean
}

type VariantProps = {
  variant: 'round' | 'square'
}

export type InputStyleProps = ErrorProps & VariantProps

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.tiny};
  width: 100%;
`

export const Input = styled.textarea<ErrorProps>`
  flex-direction: row;
  width: 100%;
  border-radius: ${borderRadiuses.medium};
  font-size: ${fontSizes.small};
  padding: ${spacings.extraSmall} ${spacings.extraExtraSmall} 0;
  background: ${colors.white};
  border-radius: ${borderRadiuses.medium};
  height: ${spacings.heightHalfScreen};
`

export const ErrorWrapper = styled.div`
  font-size: ${fontSizes.small};
  line-height: ${fontSizes.extraExtraSmall};
  color: ${colors.danger};
  font-weight: ${fontWeights.light};
  padding: 0 ${spacings.extraSmall} 0 ${spacings.extraSmall};
`

export const FieldSet = styled.fieldset<InputStyleProps>`
  position: relative;
  background: ${colors.white};
  border: ${(props) => (props.isError ? `1px solid ${colors.danger}` : 'none')};
  border-radius: ${(props) =>
    props.variant === 'round' ? borderRadiuses.medium : 0};
  font-weight: ${fontWeights.regular};
`
