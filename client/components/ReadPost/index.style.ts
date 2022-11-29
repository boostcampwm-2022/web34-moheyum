import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { markdownStyle } from '../../styles/mixin';
import { mainSectionStyle } from '../../styles/mixin';
import { displayCenter, displayColumn } from '../../styles/mixin';

export const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.GRAY4};
`;

export const Author = styled.div`
  ${displayCenter}
  margin: 10px;
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

export const ProfileImg = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid ${COLORS.PRIMARY};
  margin: 15px;
  img {
    border-radius: 50px;
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

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const PostContent = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  flex: 1;
  margin: 0 20px;
  ${markdownStyle}
`;

export const CommentBox = styled.div`
  width: 100%;
  margin: 0 25px;
`;
