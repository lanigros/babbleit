import styled from 'styled-components'
import { sizes, spacings } from '../../global-styles/variables'

export const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: ${spacings.medium} ${spacings.extraSmall};
  margin: ${spacings.large} auto;

  @media screen and (max-width: ${sizes.mobile}px) {
    grid-template-columns: 1fr;
  }
`
