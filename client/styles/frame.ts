import styled from '@emotion/styled';
import COLORS from './color';
import { displayCenter } from './mixin';

const Frame = styled.div`
  background-color: ${COLORS.WHITE};
  width: 1280px;
  height: 100%;
  ${displayCenter}
`;

export default Frame;
