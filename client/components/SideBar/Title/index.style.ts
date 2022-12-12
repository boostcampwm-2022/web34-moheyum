import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const Wrapper = styled.div`
  width: 100%;
  height: 61px;
  border-bottom: 2px ridge ${COLORS.PRIMARY};
  user-select: none;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Icon = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2px;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

export const SmallIcon = styled.div`
  width: 37px;
  height: 61px;
  padding-top: 10px;
  display: none;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: flex;
  }
`;
