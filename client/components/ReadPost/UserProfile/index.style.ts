import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { displayCenter, displayColumn } from '../../../styles/mixin';

export const Author = styled.div`
  ${displayCenter}
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

export const PostedAt = styled.div`
  ${displayColumn}
  margin: 10px;
  #time {
    display: block;
    white-space: nowrap;
    margin-bottom: 5px;
    font-size: 12px;
    color: ${COLORS.GRAY1};
  }
`;
