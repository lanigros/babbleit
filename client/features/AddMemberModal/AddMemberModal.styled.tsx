import styled from 'styled-components'
import { borderRadiuses, colors, spacings } from '../../global-styles/variables'

export const AddMemberWrapper = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
  padding: ${spacings.medium};
  background: ${colors.transparentBlack};
  border-radius: ${borderRadiuses.small};

  ::-webkit-scrollbar-track {
    background: ${colors.mediumGray};
    border-radius: ${borderRadiuses.medium};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.transParentWhite};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.paleBlue};
  }
`
