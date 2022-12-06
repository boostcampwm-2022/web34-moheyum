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

export const PostButton = styled.button`
  ${buttonStyle}
  width: 50px;
  height: 28px;
  margin: 10px;
  padding: 0;
`;

export const ButtonConatiner = styled.div`
  display: flex;
  align-items: center;
`;
