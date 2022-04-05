import { createGlobalStyle } from 'styled-components'
import { exampleColors } from './variables'

export const GlobalStyle = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    color: ${exampleColors.black};
  }
`
