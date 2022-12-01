import styled from '@emotion/styled';
import COLORS from '../../../../styles/color';
import { buttonStyle, displayColumn, markdownStyle } from '../../../../styles/mixin';

export const DropDown = styled.div`
  width: min-content;
  white-space: nowrap;
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: 10px;
`;

export const User = styled.li`
  list-style: none;
  padding: 7px;
  height: 33px;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${COLORS.GRAY3};
  }
  &:first-of-type {
    background-color: ${COLORS.PRIMARY_LIGHT};
    border-radius: 9px 9px 0px 0px;
  }
`;
