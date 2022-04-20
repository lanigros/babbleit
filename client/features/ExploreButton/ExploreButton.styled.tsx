import styled from 'styled-components'

import {
  colors,
  spacings,
  fontWeights,
  borderRadiuses,
  fontSizes,
  boxShadows
} from '../../global-styles/variables'

export const Button = styled.button`
  width: 64px;
  height: 64px;
  border-radius: ${borderRadiuses.circle};
  background-color: ${colors.yellow};
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${boxShadows.small};

  span {
    color: ${colors.black};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.medium};
  }
`
