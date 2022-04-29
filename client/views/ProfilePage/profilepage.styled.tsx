import styled from 'styled-components'
import {
  borderRadiuses,
  colors,
  fontWeights,
  sizes,
  spacings
} from '../../global-styles/variables'

export const ProfileCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: ${sizes.tablet}px) {
    margin-top: ${spacings.small};
  }
`
export const ProfilePostListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export const ProfileContainerWrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${sizes.tablet}px) {
    flex-direction: column;
    height: auto;
  }
`

export const ProfileMenu = styled.h4`
  letter-spacing: 1px;
  font-weight: ${fontWeights.medium};

  &:before {
    content: 'POSTS';
    color: ${colors.yellow};
  }

  &:after {
    content: ' | COMMENTS | SETTINGS';
  }
`

export const PostListWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: none;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: ${borderRadiuses.tiny};
    background-color: ${colors.white};
  }

  &::-webkit-scrollbar {
    width: 12px;
    border-radius: ${borderRadiuses.tiny};
    background-color: ${colors.white};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${borderRadiuses.tiny};
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${colors.black};
  }

  @media screen and (max-width: ${sizes.tablet}px) {
    overflow-y: hidden;
  }
`
