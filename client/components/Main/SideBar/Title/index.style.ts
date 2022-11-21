import styled from '@emotion/styled';
import { displayCenter } from '../../../../styles/mixin';
import COLORS from '../../../../styles/color';

export const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px ridge ${COLORS.PRIMARY};
  user-select: none;
  ${displayCenter}
`;

export const Icon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

export const SmallIcon = styled.div`
  width: 100%;
  height: 41px;
  display: none;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: flex;
  }
`;
