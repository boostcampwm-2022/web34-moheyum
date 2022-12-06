import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { mainSectionStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const TopBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    user-select: none;
    cursor: pointer;
    margin-left: 20px;
  }
`;

export const SearchInputBar = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  padding: 10px;
  font-size: 20px;
  color: ${COLORS.BLACK};
  font-weight: 500;

  &:focus {
    outline: none;
  }

  &:placeholder-shown {
    color: ${COLORS.GRAY4};
  }
`;

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > button {
    flex: 1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px;
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
    font-size: 18px;
    border: none;

    &.selected {
      background-color: ${COLORS.WHITE};
      color: ${COLORS.BLACK};
      font-weight: 700;
    }
  }
`;
