import '@emotion/react'; // it's important to use ThemeProvider

type sidebarType = {
  backgroundColor: string;
  minWidth: string;
  maxWidth: string;
};

declare module '@emotion/react' {
  export interface Theme {
    sidebar: sidebarType;
    smallWindow: string;
    wideWindow: string;
  }
}
