import { Theme } from '@emotion/react';
import COLORS from './color';

export const sidebarSize = 256;
export const maxFrameSize: number = 1295;
export const mainSectionSize = maxFrameSize - sidebarSize - 1;

const theme: Theme = {
  sidebar: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    minWidth: `82px`,
    maxWidth: `${sidebarSize}px`,
  },
  smallWindow: `1000px`,
  wideWindow: `1295px`,
};

export default theme;
