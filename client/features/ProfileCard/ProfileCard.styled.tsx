import styled from 'styled-components'

import {
  colors,
  spacings,
  borderRadiuses,
  boxShadows,
  fontWeights
} from '../../global-styles/variables'

export const Card = styled.div`
  height: 250px;
  width: 200px;
  border-radius: ${borderRadiuses.small};
  overflow: hidden;
  box-shadow: ${boxShadows.small};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const CardUpper = styled.div`
  height: 150px;
  width: 100%;
  background: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: end;
`

export const CardLower = styled.div`
  height: 100px;
  width: 100%;
  background: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const ProfilePicture = styled.div`
  height: 80px;
  width: 80px;
  border: 4px solid ${colors.yellow};
  margin-bottom: ${spacings.small};
  border-radius: ${borderRadiuses.circle};
  background: ${colors.black};
`

export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: ${spacings.extraExtraSmall};
  width: 100%;
  word-wrap: break-word;

  h5 {
    margin: 0;
    font-weight: ${fontWeights.regular};
    color: ${colors.black};
  }
  p {
    color: ${colors.mediumGray};
    margin: 0 ${spacings.extraSmall};
  }
`
