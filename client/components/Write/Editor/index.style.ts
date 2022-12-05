import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { buttonStyle, displayColumn, markdownStyle } from '../../../styles/mixin';

export const Wrapper = styled.div`
  height: 100%;
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const ToolbarContainer = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  /* background-color: ${COLORS.GRAY3}; */
  border-bottom: 1px solid ${COLORS.GRAY3};
`;

export const EditorTabs = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0 10px;
  user-select: none;
`;

interface CanBeSelected {
  selected?: boolean;
}

export const EditorTabItem = styled.li<CanBeSelected>`
  /* box-sizing: border-box; */
  height: ${(props) => (props.selected ? `calc(100% + 2px)` : `100%`)};
  width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.GRAY3};
  ${(props) =>
    props.selected &&
    `border-bottom: 1px solid white;
margin-bottom: -1px;`}
  background-color: ${(props) => (props.selected ? `${COLORS.WHITE}` : `${COLORS.GRAY3}`)};
  cursor: pointer;
`;

export const EditorTabTool = styled.li`
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: 5px;
  background-color: ${COLORS.WHITE};
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  cursor: pointer;
  &:hover {
    outline: 1px solid ${COLORS.PRIMARY};
  }
`;

export const BottomButtonConatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${COLORS.GRAY3};
  & > button {
    ${buttonStyle}
    margin: 10px 20px;
  }
`;

export const EditorTextBox = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: 10px;
  font-size: 16px;
  line-height: 26px;
  flex: 1;
  /* display: inline-block; */
  white-space: pre-wrap;
  word-wrap: break-word;
  &:focus {
    outline: none;
  }
`;

export const EditorContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const PreviewTextBox = styled.div`
  width: 100%;
  flex: 1;
  ${markdownStyle}
`;

export const CommentTopBar = styled.div`
  background-color: ${COLORS.WHITE};

  width: 100%;
  /* border-bottom: 2px solid ${COLORS.GRAY3}; */
  ${displayColumn}
`;
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
  margin: 20px 20px 0px 20px;
  & span {
    margin: 0 10px;
    font-size: 22px;
  }
`;
