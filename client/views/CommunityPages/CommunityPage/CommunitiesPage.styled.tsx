import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontWeights,
  spacings
} from '../../../global-styles/variables'

export const Title = styled.h2`
  text-align: center;
  margin: ${spacings.medium} 0;

  span {
    color: ${colors.yellow};
  }
`

export const DeleteButton = styled.button`
  border-radius: ${borderRadiuses.large};
  background: ${colors.yellow};
  height: 30px;
  width: 70px;
  margin-left: ${spacings.small};
  font-weight: ${fontWeights.semiBold};

  :hover {
    background: ${colors.danger};
    color: ${colors.white};
  }
`
