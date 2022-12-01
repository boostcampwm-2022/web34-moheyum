import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { displayCenter, mainSectionStyle, markdownStyle } from '../../styles/mixin';

export const PostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  ${mainSectionStyle}
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
export const HeaderBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.GRAY4};
`;
