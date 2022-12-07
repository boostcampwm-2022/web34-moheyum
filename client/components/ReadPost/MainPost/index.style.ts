import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { markdownStyle, buttonStyle } from '../../../styles/mixin';

export const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.GRAY4};
`;

export const MainContentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ContentBox = styled.div`
  width: 100%;
  margin-top: 20px;
  ${markdownStyle}
  font-size: 18px;
`;

export const MenuDropDown = styled.button`
  width: 35px;
  height: 35px;
  margin: 10px;
  padding: 0;
  border: 0px;
  border-radius: 5px;
  background-color: ${COLORS.WHITE};
  &:hover {
    background-color: ${COLORS.GRAY5};
  }
`;

export const ButtonConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DropDown = styled.div`
  position: absolute;
  width: 70px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 10px;
  background-color: ${COLORS.WHITE};
  margin-top: 120px;
  margin-right: 45px;
`;

export const PostButton = styled.div`
  width: 100%;
  background-color: ${COLORS.WHITE};
  height: 39px;
  line-height: 39px;
  text-align: center;
  font-size: 15px;
  &:first-of-type {
    border-bottom: 2px solid ${COLORS.GRAY3};
    border-radius: 10px 10px 0px 0px;
  }
  &:hover {
    background-color: ${COLORS.GRAY5};
    color: ${COLORS.PRIMARY_DARK};
  }
  &:last-of-type {
    border-radius: 0px 0px 10px 10px;
  }
  &:active {
    font-weight: 600;
    background-color: ${COLORS.GRAY4};
  }
`;
