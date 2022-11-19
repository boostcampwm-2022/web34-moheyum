import { Theme } from '@emotion/react';
import COLORS from './color';

const sidebarSize = 190;
export const maxFrameSize: number = 1280;

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
  smallWindow: `800px`,
  wideWindow: `1280px`,
};

export default theme;
