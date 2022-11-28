import styled from '@emotion/styled';
import COLORS from './color';
import { displayColumn } from './mixin';
export const TopBar = styled.div`
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
