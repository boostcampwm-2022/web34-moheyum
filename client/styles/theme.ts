import { Theme } from '@emotion/react';
import COLORS from './color';

export const sidebarSize = 256;
export const maxFrameSize: number = 1295;
export const mainSectionSize = maxFrameSize - sidebarSize - 1;
export const getLeftWidth = (windowWidth: number) => {
  if (windowWidth > 1295) {
    return (windowWidth - maxFrameSize) / 2 + sidebarSize;
  }
  if (windowWidth <= 1000) {
    return 82;
  }
  return sidebarSize;
};

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
