import { Theme } from '@emotion/react';
import COLORS from './color';

const sidebarSize = 16.6;

const theme: Theme = {
  sidebar: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    width: `${sidebarSize}%`,
  },
  mainSection: {
    backgroundColor: COLORS.WHITE,
    width: `${100 - sidebarSize}%`,
  },
};

export default theme;
