import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const Wrapper = styled.div`
  width: inherit;
  background-color: ${COLORS.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 36px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }

  & > hr {
    width: 100%;
    margin-top: 16px;
    background-color: ${COLORS.GRAY3};
    height: 1px;
    border: none;
    margin-block-end: 0;
  }
`;

export const ArticleHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
`;

export const Comments = styled.div`
  color: ${COLORS.BLACK};
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > span {
    margin: 0 8px;
  }

  & img {
    padding-top: 2px !important;
  }
`;

export const PostedAt = styled.div`
  color: ${COLORS.GRAY2};
  font-weight: 400;
  font-size: 16px;
`;

export const ArticleContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  height: 125px;
  line-height: 25px;
  flex: 1;
  display: -webkit-box;
  word-break: break-all;
  padding-right: 10px;
  word-break: break-word;
  text-overflow: ellipsis;
  line-clamp: 5;
  -webkit-line-clamp: 5;
  box-orient: vertical;
  -webkit-box-orient: vertical;
`;

export const ArticleImageContainer = styled.div`
  width: 130px;
  height: 130px;
  background-color: ${COLORS.GRAY4};
  border: 1px solid ${COLORS.GRAY3};
  position: relative;
`;
