import '@emotion/react'; // it's important to use ThemeProvider

type sidebarType = {
  backgroundColor: string;
  minWidth: string;
  maxWidth: string;
};

type mainSectionType = {
  backgroundColor: string;
  width: string;
};

declare module '@emotion/react' {
  export interface Theme {
    sidebar: sidebarType;
    mainSection: mainSectionType;
    smallWindow: string;
    wideWindow: string;
  }
}
