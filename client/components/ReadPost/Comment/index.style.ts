import styled from '@emotion/styled';

export const CommentItem = styled.li`
  list-style: none;
  padding-left: 0px;
  margin-bottom: 15px;
  > a {
    width: min-content;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
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
    #text-box {
      width: 84%;
    }
  }
`;
