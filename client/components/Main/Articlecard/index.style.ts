import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const Wrapper = styled.div`
  width: inherit;
  margin: 10px 20px;
  background-color: ${COLORS.WHITE};
  border-radius: 10px;
  border: 2px solid ${COLORS.GRAY3};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  cursor: pointer;

  & > hr {
    width: 100%;
    margin: 20px 0;
    background-color: ${COLORS.GRAY4};
    height: 1px;
    border: none;
  }
`;

export const ArticleHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Author = styled.div`
  color: ${COLORS.BLACK};
  font-weight: 600;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${COLORS.GRAY4};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid ${COLORS.GRAY3};
    margin-right: 10px;
  }
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
`;

export const PostedAt = styled.div`
  color: ${COLORS.GRAY2};
`;

export const ArticleContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  flex: 1;
`;

export const ArticleImage = styled.div`
  width: 130px;
  height: 130px;
  background-color: ${COLORS.GRAY4};
  border: 1px solid ${COLORS.GRAY3};
`;
