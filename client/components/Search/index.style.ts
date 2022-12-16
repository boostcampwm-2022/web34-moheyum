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

    &::placeholder {
      color: ${COLORS.WHITE};
    }
  }

  &::placeholder {
    color: ${COLORS.GRAY2};
    user-select: none;
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
    /* box-shadow: 5px 5px 20px grey inset; */
    &.selected {
      background-color: ${COLORS.WHITE};
      color: ${COLORS.BLACK};
      font-weight: 700;
    }
    &:not(.selected) {
      box-shadow: 0px -5px 5px 1px rgba(0, 0, 0, 0.2) inset;
      font-size: 16px;
    }
  }
`;

export const ResultContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  & > span {
    text-align: center;
    align-self: center;
    color: ${COLORS.GRAY3};
    padding-bottom: 160px;
  }
`;
export const ResultHeader = styled.h1`
  width: 100%;
  font-size: 24px;
  padding: 15px;
  border-bottom: 2px solid ${COLORS.GRAY4};
  margin-bottom: 30px;
  & > span {
    font-weight: 700;
    font-size: 28px;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 160px;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding-bottom: 160px;
  color: ${COLORS.GRAY3};
`;

export const Footer = styled.footer`
  width: '100%';
  height: '50px';
  display: flex;
  justify-content: center;
  align-items: center;
`;
