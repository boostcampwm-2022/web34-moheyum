import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { displayColumn } from '../../styles/mixin';
import { mainSectionSize } from '../../styles/theme';

export const Wrapper = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.header`
  /* position: fixed; */
  background-color: ${COLORS.WHITE};
  height: 61px;
  width: ${mainSectionSize}px;
  border-bottom: 2px solid ${COLORS.GRAY3};
  display: flex;
  flex-direction: row;
  align-items: center;
  h1 {
    flex: 1;
    font-size: 22px;
    font-weight: 500;
    text-align: left;
    color: ${COLORS.BLACK};
    ${displayColumn}
    margin-left: 33px;
  }
  img {
    border-radius: 5px;
    &:hover {
      background-color: ${COLORS.GRAY5};
    }
  }
`;

export const Menu = styled.div`
  width: 30px;
  margin-right: 33px;
`;

export const DropDown = styled.div`
  position: absolute;
  width: 70px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 10px;
  background-color: ${COLORS.WHITE};
  margin-left: -80px;
  margin-top: -35px;
  z-index: 1;
`;

export const PostButton = styled.div`
  width: 100%;
  background-color: ${COLORS.WHITE};
  height: 38px;
  line-height: 39px;
  text-align: center;
  font-size: 15px;
  border-radius: 10px;
  &:hover {
    background-color: ${COLORS.GRAY5};
    color: ${COLORS.PRIMARY_DARK};
  }
  &:active {
    font-weight: 600;
    background-color: ${COLORS.GRAY4};
  }
`;

export const NotificationContainer = styled.div`
  overflow-y: scroll;
  flex: 1;
  padding: 0px 20px;
`;

export const ExceptionPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewNoti = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${COLORS.WHITE};
  border: 0px;
  border-bottom: 2px solid ${COLORS.GRAY5};
  div {
    width: 100px;
    height: 20px;
    color: ${COLORS.PRIMARY_DARK};
    font-size: 16px;
  }
  &:hover {
    background-color: ${COLORS.GRAY4};
    button {
      background-color: ${COLORS.GRAY4};
    }
  }
`;

export const Footer = styled.footer`
  width: '100%';
  height: '50px';
  display: flex;
  justify-content: center;
  align-items: center;
`;
