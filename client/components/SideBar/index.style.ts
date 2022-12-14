import styled from '@emotion/styled';
import { displayColumn } from '../../styles/mixin';
import COLORS from '../../styles/color';

export const Dropdown = styled.div`
  width: fit-content;
  /* position: fixed; */
  margin-left: 30px;
  justify-content: center;
  align-items: right;
  margin-bottom: 10px;
  position: relative;
  white-space: nowrap;
  background-color: ${COLORS.WHITE};
  border-radius: 6px;
  ${displayColumn}
  border: 1px solid ${COLORS.PRIMARY_DARK};
  button {
    font-size: 14px;
    margin: 0px 10px;
    padding: 10px 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${COLORS.GRAY3};

    &:hover {
      color: ${COLORS.PRIMARY_DARK};
      font-weight: 600;
      & a {
        color: ${COLORS.PRIMARY_DARK};
        font-weight: 600;
      }
    }
  }
`;

export const Wrapper = styled.aside`
  width: ${({ theme }) => theme.sidebar.maxWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.sidebar.backgroundColor};
  z-index: 3;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: ${({ theme }) => theme.sidebar.minWidth};
  }
`;

export const SideMenuBox = styled.div`
  width: 100%;
  flex: 1;
`;

export const Setting = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  cursor: pointer;
`;
