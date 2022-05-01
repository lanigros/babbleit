import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontWeights,
  spacings
} from '../../global-styles/variables'

export type DangerProps = {
  danger?: boolean
}

export const ButtonWrapper = styled.button<DangerProps>`
  border-radius: ${borderRadiuses.large};
  background: ${colors.yellow};
  padding: ${spacings.extraExtraSmall} ${spacings.extraSmall};
  font-weight: ${fontWeights.bold};

  :hover {
    background: ${(props) => (props.danger ? colors.danger : colors.yellow)};
    color: ${colors.white};
  }
`
