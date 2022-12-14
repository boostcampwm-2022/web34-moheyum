import styled from '@emotion/styled';
import COLORS from '../../../../styles/color';

export const DropDown = styled.div`
  width: min-content;
  white-space: nowrap;
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
`;

export const User = styled.li`
  list-style: none;
  padding: 7px;
  height: 33px;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${COLORS.GRAY3};
  }
  &:first-of-type {
    border-radius: 9px 9px 0px 0px;
  }
  &:last-of-type {
    border-radius: 0px 0px 9px 9px;
  }
  &:first-of-type:nth-last-of-type(1) {
    border-radius: 9px;
  }
`;
