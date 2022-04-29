import styled from 'styled-components'
import { colors, spacings } from '../../../global-styles/variables'

export const Title = styled.h2`
  text-align: center;
  margin: ${spacings.medium} 0;

  span {
    color: ${colors.yellow};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`
