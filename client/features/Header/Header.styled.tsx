import styled from 'styled-components'

import {
  colors,
  sizes,
  spacings,
  headerHeight,
  fontWeights,
  borderRadiuses
} from '../../global-styles/variables'

export const HeaderWrapper = styled.div`
  position: relative;
  height: ${headerHeight}px;
  z-index: 1000000;
`

export const HeaderBody = styled.header`
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: space-between;
  height: ${headerHeight}px;
  background-color: ${colors.black};
  align-items: center;
  padding: 0 ${spacings.extraLarge};

  @media screen and (max-width: ${sizes.tablet}px) {
    padding: 0 ${spacings.medium};
  }

  @media screen and (max-width: ${sizes.mobile}px) {
    padding: 0 ${spacings.extraSmall};
  }
`
export const ProfileWrapper = styled.div`
  display: flex;
  border-radius: ${borderRadiuses.circle};
  background-color: ${colors.black};
  height: ${headerHeight / 1.5}px;
  width: ${headerHeight / 1.5}px;
  align-items: center;
  justify-content: center;
  border: 3.5px solid ${colors.yellow};
`
export const InitialLetter = styled.h4`
  color: ${colors.white};
  font-weight: ${fontWeights.light};
`
export const NotLoggedInTxt = styled.p`
  color: ${colors.white};
`
