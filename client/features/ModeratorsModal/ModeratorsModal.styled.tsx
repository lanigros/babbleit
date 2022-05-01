import styled from 'styled-components'
import { colors, fontSizes } from '../../global-styles/variables'

export const CloseButton = styled.button`
  font-size: ${fontSizes.medium};
  color: ${colors.white};

  :hover {
    color: ${colors.yellow};
  }
`
