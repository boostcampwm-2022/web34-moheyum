import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { markdownStyle } from '../../styles/mixin';
import { mainSectionStyle } from '../../styles/mixin';
import { displayCenter } from '../../styles/mixin';

export const HeaderBox = styled.div`
  width: 95%;
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
  flex-direction: column;
  align-items: center;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentBox = styled.div`
  width: 92%;
  margin-top: 20px;
  ${markdownStyle}
`;

export const CommentBox = styled.div`
  width: 95%;
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
    li {
      list-style: none;
      padding-left: 0px;
      margin-bottom: 15px;
      a {
        width: 22%;
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      #text-box {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        #content {
          width: 90%;
        }
      }
    }
  }
`;

export const Loader = styled.div`
  margin-top: 40px;
  width: 20px;
  height: 20px;
  ${displayCenter}
`;
