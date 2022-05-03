import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontSizes,
  lineHeights,
  spacings
} from '../../global-styles/variables'

export const DeleteWrapper = styled.div`
  padding: ${spacings.medium} ${spacings.large};
  background: ${colors.lightGray};
  border-radius: ${borderRadiuses.medium};
`

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ErrorWrapper = styled.p`
  color: ${colors.danger};
  margin-top: ${spacings.tiny};
  align-self: flex-end;
`

export const Message = styled.h3`
  color: ${colors.black};
  max-width: 400px;
  font-size: ${fontSizes.medium};
  line-height: ${lineHeights.medium};
`

export const ButtonContainer = styled.div`
  margin-top: ${spacings.small};
  display: flex;
  justify-content: space-between;
  width: 100%;
`
