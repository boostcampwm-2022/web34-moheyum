import styled from '@emotion/styled';
import COLORS from '../../../../styles/color';

export const Author = styled.div`
  color: ${COLORS.BLACK};
  font-weight: 600;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* & > div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${COLORS.GRAY4};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid ${COLORS.GRAY3};
    margin-right: 10px;
  } */
`;
export const Profile = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid ${COLORS.PRIMARY};
  margin: 15px;
  padding-right: 45px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;
export const AuthorDetail = styled.div`
  #name {
    white-space: nowrap;
    font-weight: 500;
    font-size: 18px;
  }
  #user-id {
    white-space: nowrap;
    margin: 3px 1px;
    color: ${COLORS.GRAY1};
    font-size: 14px;
  }
`;
