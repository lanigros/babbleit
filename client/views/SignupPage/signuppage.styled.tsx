import styled from 'styled-components'

import { colors, spacings, sizes } from '../../global-styles/variables'

export const BackgroundContainer = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
export const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: ${spacings.large} 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${spacings.huge};

  @media screen and (max-width: ${sizes.mobile}px) {
    gap: ${spacings.small};
    align-items: center;
  }
`

export const LandingPageTitle = styled.h1`
  color: ${colors.yellow};
  margin: ${spacings.small} 0;
  letter-spacing: ${spacings.tiny};
  text-transform: uppercase;

  &:before {
    content: 'Babble';
    color: ${colors.darkGray};
  }

  &:after {
    content: '://';
    letter-spacing: 0px;
    color: ${colors.darkGray};
  }

  @media screen and (max-width: ${sizes.mobile}px) {
    color: ${colors.yellow};

    &:before {
      content: 'Babble';
      color: ${colors.yellow};
    }

    &:after {
      content: '://';
      letter-spacing: 0px;
      color: ${colors.yellow};
    }
  }
`
