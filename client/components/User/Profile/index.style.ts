import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { buttonStyle } from '../../../styles/mixin';

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

export const AvatarBox = styled.div`
  width: 190px;
  height: 190px;
  border-radius: 190px;
  border: 3px solid ${COLORS.PRIMARY};
  background-color: ${COLORS.WHITE};
  margin: 50px;
  aspect-ratio: 1;
  position: relative;

  & > img {
    object-fit: cover;
    border-radius: 100%;
  }
`;

export const ProfileDetail = styled.div`
  width: 500px;
`;

export const ProfileNames = styled.div`
  margin: 20px 0;
`;

export const ProfileNickname = styled.div`
  font-size: 32px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.BLACK};
`;

export const ProfileUserid = styled.div`
  margin-top: 5px;
  color: ${COLORS.GRAY2};
  &:before {
    content: '@';
  }
`;

export const ProfileCounters = styled.div`
  margin: 20px 0;
  display: flex;
  & span {
    font-weight: 500;
  }
`;

export const ProfileBio = styled.div`
  margin: 20px 0;
`;

export const ProfileEditButton = styled.button`
  ${buttonStyle}
  background-color: ${COLORS.PRIMARY};
  border-radius: 4px;
  border: none;
  font-size: 16px;
  padding: 4px 8px;
  color: ${COLORS.WHITE};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: white;
    text-decoration: none;
  }
  margin-left: 20px;
`;
