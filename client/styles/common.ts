import styled from '@emotion/styled';
import COLORS from './color';
import { displayColumn } from './mixin';

export const MainTopBar = styled.header`
  /* position: fixed; */
  background-color: ${COLORS.WHITE};
  height: 61px;
  border-bottom: 2px solid ${COLORS.GRAY3};
  width: 100%;
  color: ${COLORS.BLACK};
  font-size: 22px;
  text-align: left;
  font-weight: 500;
  ${displayColumn}
  div {
    margin-left: 39px;
  }
`;

export const TopBar = styled.header`
  /* position: fixed; */
  background-color: ${COLORS.WHITE};
  height: 61px;
  width: 100%;
  border-bottom: 2px solid ${COLORS.GRAY3};
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  h1 {
    flex: 1;
    font-size: 22px;
    font-weight: 500;
    text-align: left;
    color: ${COLORS.BLACK};
    margin-left: 6px;
    ${displayColumn}
  }
`;

export const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  width: 18px;
  height: 18px;
  margin-left: 15px;
  background-image: url('/ico_chveron_left.svg');
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;
