import { Theme } from '@emotion/react';
import COLORS from './color';

const sidebarSize = 256;
export const maxFrameSize: number = 1295;

const theme: Theme = {
  sidebar: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    minWidth: `82px`,
    maxWidth: `${sidebarSize}px`,
  },
  mainSection: {
    backgroundColor: COLORS.WHITE,
    width: `${maxFrameSize - sidebarSize}px`,
  },
  smallWindow: `1000px`,
  wideWindow: `1295px`,
};

export default theme;
