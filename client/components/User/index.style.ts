import styled from '@emotion/styled';
import COLORS from '../../styles/color';

export const Wrapper = styled.div`
  width: ${({ theme }) => theme.mainSection.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mainSection.backgroundColor};
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.maxWidth});
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.minWidth});
  }
  background-color: ${COLORS.OFF_WHITE};
  flex: 1;
  overflow-y: scroll;
`;
