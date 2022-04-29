import styled from 'styled-components'

import {
  colors,
  borderRadiuses,
  boxShadows
} from '../../global-styles/variables'

export const Button = styled.div`
  width: 200px;
  height: 50px;
  border-radius: ${borderRadiuses.medium};
  background: linear-gradient(
    to right,
    ${colors.yellow} 0 25%,
    ${colors.white} 0 75%
  );
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: ${boxShadows.small};

  &:hover {
    cursor: pointer;
  }
`
