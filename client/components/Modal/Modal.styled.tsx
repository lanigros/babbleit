import styled from 'styled-components'
import { colors } from '../../global-styles/variables'

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: ${colors.transParentWhite};
  display: flex;
  align-items: center;
  justify-content: center;
`
