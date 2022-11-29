import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { displayCenter, markdownStyle } from '../../../styles/mixin';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Author = styled.div`
  ${displayCenter}
`;

export const AuthorDetail = styled.div`
  display: flex;
  margin-bottom: 20px;
  #name {
    font-weight: 500;
    font-size: 18px;
  }
  #user-id {
    margin: 3px 3px;
    color: ${COLORS.GRAY1};
    font-size: 14px;
  }
  #time {
    margin: 3px 1px;
    margin-left: 2px;
    color: ${COLORS.GRAY1};
    font-size: 14px;
  }
`;

export const ContentBox = styled.div`
  width: 81%;
  ${markdownStyle}
`;

export const HeaderBox = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;
