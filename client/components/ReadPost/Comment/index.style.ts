import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const CommentItem = styled.li`
  list-style: none;
  padding-left: 0px;
  margin-bottom: 15px;
`;

export const CommentContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .text-box {
      width: 86%;
    }
  }
`;

export const CommentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .text-box {
    width: 84%;
  }
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
    margin-top: 2px !important;
  }
`;
