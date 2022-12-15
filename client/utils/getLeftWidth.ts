import { maxFrameSize, sidebarSize } from '../styles/theme';

export const getLeftWidth = (windowWidth: number) => {
  if (windowWidth > 1295) {
    return (windowWidth - maxFrameSize) / 2 + sidebarSize;
  }
  if (windowWidth <= 1000) {
    return 82;
  }
  return sidebarSize;
};
