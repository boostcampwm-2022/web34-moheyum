import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { markdownStyle } from '../../styles/mixin';

export const PostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Author = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
`;

export const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid ${COLORS.GRAY2};
  background-color: ${COLORS.GRAY3};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 15px;
`;

export const PostedAt = styled.div`
  color: ${COLORS.GRAY3};
  display: flex;
  align-items: center;
  margin: 15px;
`;

export const Wrapper = styled.div`
  width: ${({ theme }) => theme.mainSection.width};
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const ContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const PostContent = styled.div`
  width: 100%;
  flex: 1;
  margin: 0 20px;
  ${markdownStyle}
`;
