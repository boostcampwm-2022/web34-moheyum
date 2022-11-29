import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { displayCenter, displayColumn } from '../../../styles/mixin';

export const Author = styled.div`
  ${displayCenter}
`;

export const AuthorDetail = styled.div`
  #name {
    font-weight: 500;
    font-size: 18px;
  }
  #user-id {
    margin: 3px 1px;
    color: ${COLORS.GRAY1};
    font-size: 14px;
  }
`;

export const PostedAt = styled.div`
  ${displayColumn}
  margin: 10px;
  #time {
    margin-bottom: 5px;
    font-size: 12px;
    color: ${COLORS.GRAY1};
  }
`;
