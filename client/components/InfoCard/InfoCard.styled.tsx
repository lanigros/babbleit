import styled from 'styled-components'
import {
  colors,
  borderRadiuses,
  boxShadows,
  fontWeights,
  fontSizes,
  spacings
} from '../../global-styles/variables'

type BlockedProps = {
  isBlocked?: boolean
}

export const CardContainer = styled.div`
  max-width: 100%;
  width: 100%;
  min-height: 155px;
  border: 1px solid black;
  background: ${colors.black};
  border-radius: ${borderRadiuses.small};
  box-shadow: ${boxShadows.small};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${spacings.extraSmall};
`

export const CardFooter = styled.div`
  width: 100%;
  height: 50px;
  background: ${colors.darkGray};
  align-self: end;
  border-radius: 0 0 ${borderRadiuses.small} ${borderRadiuses.small};
  padding: ${spacings.extraSmall};
`

export const CardFooterContent = styled.div<BlockedProps>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isBlocked ? 'space-between' : 'end')};
`

export const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export const CardTextContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-self: center;

  h6,
  p {
    color: ${colors.white};
  }
`

export const CardTitle = styled.h6`
  line-height: 1;
  margin: 0;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semiBold};
`

export const CardDescription = styled.p`
  font-size: ${fontSizes.extraSmall};
  font-weight: ${fontWeights.light};
`

export const CardThumbnail = styled.div`
  min-height: 70px;
  min-width: 70px;
  border-radius: ${borderRadiuses.small};
  margin-right: ${spacings.extraSmall};
`

export const PlaceholderIcons = styled.span`
  font-size: ${fontSizes.small};
`

export const MenuHolder = styled.div`
  align-self: flex-start;
`
