import styled from '@emotion/styled';
import COLORS from './color';
import { displayCenter } from './mixin';
import { maxFrameSize } from './theme';

const Frame = styled.div`
  background-color: ${COLORS.BACKGROUND};
  width: ${maxFrameSize}px;
  min-width: 600px;
  min-height: 861px;
  height: 100%;
  ${displayCenter}
  border-right: 1px solid ${COLORS.GRAY3};
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: 100vw;
  }
`;

export const SignFrame = styled.div`
  background-color: ${COLORS.WHITE};
  width: ${maxFrameSize}px;
  height: 100%;
  ${displayCenter}
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: 100vw;
  }
`;

export default Frame;
