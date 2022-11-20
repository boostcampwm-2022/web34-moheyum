import styled from '@emotion/styled';
import COLORS from './color';
import { displayCenter } from './mixin';
import { maxFrameSize } from './theme';

const Frame = styled.div`
  background-color: ${COLORS.WHITE};
  width: ${maxFrameSize}px;
  height: 100%;
  ${displayCenter}
  @media only screen and (max-width:${({ theme }) => theme.wideWindow}) {
    width: 100%;
  }
`;

export default Frame;
