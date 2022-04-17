import styled from 'styled-components'
import * as styles from '../../../global-styles/variables'

export const Banner = styled.div``

export const BannerTitle = styled.div`
  font-size: ${styles.fontSizes.extraLarge};
  font-weight: ${styles.fontWeights.bold};
  color: ${styles.colors.black};
  max-width: ${styles.sizes.mobile}px;
  margin: auto;
  margin-top: ${styles.spacings.medium};

  span {
    color: ${styles.colors.yellow};
  }
`

export const FormWrapper = styled.form`
  max-width: ${styles.sizes.mobile}px;

  display: flex;
  flex-direction: column;
  gap: ${styles.spacings.medium};
  margin: auto;
  margin-top: ${styles.spacings.medium};

  button {
    background-color: ${styles.colors.black};
    color: ${styles.colors.yellow};
    padding: ${styles.spacings.extraSmall};
    border-radius: ${styles.borderRadiuses.small};
  }
`

export const ErrorText = styled.p`
  font-size: ${styles.fontSizes.small};
  line-height: ${styles.lineHeights.small};
  color: ${styles.colors.danger};
  font-weight: ${styles.fontWeights.light};
  padding: 0 ${styles.spacings.extraSmall} 0 ${styles.spacings.extraSmall};
`
