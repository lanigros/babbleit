import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontSizes,
  fontWeights,
  sizes,
  spacings
} from '../../global-styles/variables'

export const LoginWrapper = styled.form`
  display: grid;
  gap: ${spacings.extraSmall};
  background: ${colors.transparentBlack};
  border-radius: ${borderRadiuses.medium};
  padding: ${spacings.large} ${spacings.large};
  max-width: 350px;

  @media screen and (max-width: ${sizes.tablet}px) {
    padding: ${spacings.medium} ${spacings.small};
  }
`

export const Title = styled.h3`
  padding: 0 0 0 ${spacings.extraSmall};
`

export const Button = styled.button`
  height: 45px;
  background: ${colors.yellow};
  border-radius: ${borderRadiuses.medium};
  width: 50%;
  justify-self: flex-end;
  color: ${colors.darkGray};
  font-weight: ${fontWeights.semiBold};
  font-size: ${fontSizes.small};

  :hover {
    transition: 0.2s all ease;
    opacity: 0.9;
    color: ${colors.lightGray};
  }

  :disabled {
    opacity: 0.5;
  }

  :disabled:hover {
    opacity: 0.5;
    color: ${colors.darkGray};
  }
`
