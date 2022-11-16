import '@emotion/react'; // it's important to use ThemeProvider

type sidebarType = {
  backgroundColor: string;
  width: string;
};

type mainSectionType = {
  backgroundColor: string;
  width: string;
};

declare module '@emotion/react' {
  export interface Theme {
    sidebar: sidebarType;
    mainSection: mainSectionType;
  }
}
