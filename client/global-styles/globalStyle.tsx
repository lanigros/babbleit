import { createGlobalStyle } from 'styled-components'
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  sizes,
  spacings
} from './variables'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${fonts.poppins};
    background: ${colors.darkGray};
  }
  
  main {
    margin: 0 ${spacings.extraLarge};

    @media screen and (max-width: ${sizes.tablet}px){
      margin: 0 ${spacings.medium};
    }

    @media screen and (max-width: ${sizes.mobile}px){
      margin: 0 ${spacings.extraSmall};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6
  p {
    color: ${colors.white};
  }

  h1 {
    font-size: ${fontSizes.extraExtraLarge};
    line-height: ${lineHeights.extraExtraLarge};
    font-weight: ${fontWeights.bold};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.large};
      line-height: ${lineHeights.large};
    }
  }

  h2 {
    font-size: ${fontSizes.extraLarge};
    line-height: ${lineHeights.extraLarge};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.medium};
      line-height: ${lineHeights.medium};
    }
  }

  h3 {
    font-size: ${fontSizes.large};
    line-height: ${lineHeights.large};
    font-weight: ${fontWeights.medium};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.medium};
      line-height: ${lineHeights.medium};
    }
  }

  h4 {
    font-size: ${fontSizes.medium};
    line-height: ${lineHeights.medium};

    @media screen and (max-width: ${sizes.mobile}px){
      font-size : ${fontSizes.small};
      line-height: ${lineHeights.small};
    }
  }

  h5 {
    font-size : ${fontSizes.small};
    line-height: ${lineHeights.small};
  }

  h6 {
    font-size : ${fontSizes.extraSmall};
    line-height: ${lineHeights.extraExtraLarge};
  }

  p {
    font-size: ${fontSizes.extraExtraSmall};
    line-height: ${lineHeights.extraExtraSmall};
  }
`
