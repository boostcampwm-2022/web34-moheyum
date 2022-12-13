import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { displayCenter, markdownStyle } from '../../../styles/mixin';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > a {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

export const Author = styled.div`
  ${displayCenter}
`;

export const BlurredAuthor = styled.div`
  ${displayCenter}
  filter: blur(8px);
`;

export const AuthorDetail = styled.div`
  display: flex;
  margin-bottom: 20px;
  .name {
    font-weight: 500;
    font-size: 18px;
  }
  .user-id {
    margin: 3px 3px;
    color: ${COLORS.GRAY1};
    font-size: 14px;
  }
  .time {
    margin: 3px 1px;
    margin-left: 2px;
    color: ${COLORS.GRAY1};
    font-size: 14px;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  & > a {
    flex: 1;
  }

  & .content {
    ${markdownStyle}
    width: 100%;
    max-height: 350px;
    overflow-y: hidden;
  }
`;

export const NoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  color: ${COLORS.GRAY1};
  padding: 25px 10px;
`;

export const HeaderBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const ParentTreeContainer = styled.div`
  width: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ParentTree = styled.div`
  width: 1px;
  margin: 0px 33px;
  border: 1px solid ${COLORS.GRAY3};
  height: calc(100% + 15px);
`;

export const ParentFilter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(transparent 20%, ${COLORS.WHITE});
`;
