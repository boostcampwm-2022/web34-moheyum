import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { markdownStyle, mainSectionStyle, displayCenter, buttonStyle } from '../../styles/mixin';

export const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.GRAY4};
`;

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const PostContent = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  -ms-overflow-style: none;
  padding: 8px 15px;
  &::-webkit-scrollbar {
    display: none;
  }
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

export const CommentBox = styled.div`
  width: 100%;
  margin-top: 40px;
  border-top: 1px solid ${COLORS.GRAY4};
  display: flex;
  flex-direction: column;
  align-items: center;
  #title {
    width: 100%;
    height: 60px;
    padding: 20px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid ${COLORS.GRAY4};
  }
  #comment {
    width: 100%;
    a {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    #text {
      color: ${COLORS.GRAY2};
    }
  }
  #list {
    width: 100%;
  }
`;

export const Loader = styled.div`
  margin-top: 40px;
  width: 20px;
  height: 20px;
  ${displayCenter}
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
