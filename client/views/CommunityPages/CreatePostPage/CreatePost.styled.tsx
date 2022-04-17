import styled from 'styled-components'
import {
  fontSizes,
  fontWeights,
  colors,
  sizes,
  spacings,
  borderRadiuses,
  lineHeights
} from '../../../global-styles/variables'

export const Banner = styled.div``

export const BannerTitle = styled.div`
  font-size: ${fontSizes.extraLarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.black};
  max-width: ${sizes.mobile}px;
  margin: auto;
  margin-top: ${spacings.medium};

  span {
    color: ${colors.yellow};
  }
`

export const FormWrapper = styled.form`
  max-width: ${sizes.mobile}px;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  margin: auto;
  margin-top: ${spacings.medium};

  button {
    background-color: ${colors.black};
    color: ${colors.yellow};
    padding: ${spacings.extraSmall};
    border-radius: ${borderRadiuses.small};
  }
`

export const ErrorText = styled.p`
  font-size: ${fontSizes.small};
  line-height: ${lineHeights.small};
  color: ${colors.danger};
  font-weight: ${fontWeights.light};
  padding: 0 ${spacings.extraSmall};
`
