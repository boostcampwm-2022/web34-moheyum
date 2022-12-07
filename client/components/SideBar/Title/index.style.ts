import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const Wrapper = styled.div`
  width: 100%;
  height: 61px;
  border-bottom: 2px ridge ${COLORS.PRIMARY};
  user-select: none;
`;

export const Icon = styled.div`
  position: relative;
  margin-left: 22px;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

export const SmallIcon = styled.div`
  width: 100%;
  height: 61px;
  margin-left: 23px;
  display: none;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: flex;
  }
`;
