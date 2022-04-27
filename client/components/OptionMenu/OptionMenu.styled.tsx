import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontSizes,
  fontWeights,
  spacings
} from '../../global-styles/variables'

type ActiveProps = {
  isActive: boolean
}

type DangerProps = {
  danger?: boolean
}

export const OptionMenuWrapper = styled.div`
  padding: ${spacings.tiny};
`

export const OptionMenuM = styled.div<ActiveProps>`
  display: flex;
  height: 50px;
  width: 50px;
  background: ${colors.yellow};
  border-radius: ${borderRadiuses.circle};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const IconSpan = styled.span`
  font-size: ${fontSizes.medium};
`
export const MenuOptions = styled.div`
  position: absolute;
`

export const Option = styled.button<DangerProps>`
  font-size: ${fontSizes.extraSmall};
  font-weight: ${fontWeights.semiBold};
  padding: ${spacings.extraExtraSmall};
  border-radius: ${borderRadiuses.medium};
  align-items: center;
  justify-content: center;
  background: ${colors.lightGray};
  margin: ${spacings.tiny};
  transition: all 0.3s ease-out;
  cursor: pointer;

  :hover {
    background: ${(props) => (props.danger ? colors.danger : colors.yellow)};
  }
`
