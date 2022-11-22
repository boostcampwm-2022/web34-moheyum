import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const TopButtonConatiner = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLORS.GRAY1};
  padding: 15px;
  display: flex;
  flex-direction: row;
  & > h1 {
    flex: 1;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  & > div {
    width: 30px;
    height: 30px;
  }
`;

export const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  width: 15px;
  height: 15px;
  margin: 15px 15px;
  background-image: url('/ico_chveron_left.svg');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const ToolbarContainer = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.GRAY3};
  border-bottom: 1px solid ${COLORS.PRIMARY};
`;

export const EditorTabs = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0 20px;
  user-select: none;
`;

interface CanBeSelected {
  selected?: boolean;
}

export const EditorTabItem = styled.li<CanBeSelected>`
  /* box-sizing: border-box; */
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.PRIMARY};
  ${(props) =>
    props.selected &&
    `border-bottom: 1px solid white;
margin-bottom: -1px;`}
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => (props.selected ? `${COLORS.WHITE}` : `${COLORS.GRAY3}`)};
  cursor: pointer;
`;

export const EditorTabTool = styled.li`
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: 5px;
  background-color: ${COLORS.WHITE};
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  cursor: pointer;
`;

export const BottomButtonConatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${COLORS.PRIMARY};
  & > button {
    ${buttonStyle}
    margin: 10px 20px;
  }
`;

export const EditorTextBox = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: 10px;
  font-size: 12px;
  line-height: 16px;
  flex: 1;
  /* display: inline-block; */
  white-space: pre-wrap;
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
  padding: 10px;
  font-size: 12px;
  white-space: pre-line;
  line-height: 16px;
  min-height: 12px;

  & > * {
    margin-bottom: 8px;
  }

  & h1,
  h2 {
    border-bottom: 1px solid ${COLORS.GRAY4};
  }

  & h1 {
    margin-top: 24px;
    padding-bottom: 8px;
    line-height: 1.25;
    font-size: 30px;
    font-weight: 700;
  }

  & h2 {
    margin-top: 20px;
    padding-bottom: 6px;
    line-height: 1.25;
    font-size: 22px;
    font-weight: 600;
  }

  & h3 {
    line-height: 1.25;
    font-size: 18px;
    font-weight: 500;
  }

  & code {
    padding: 2px 4px;
    background-color: ${COLORS.GRAY3};
    border-radius: 6px;
    font-size: 85%;
  }
`;
