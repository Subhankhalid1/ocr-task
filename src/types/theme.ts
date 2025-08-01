import { darkTheme, lightTheme } from '../constants/theme';

export enum THEME_TYPE {
  light = 'light',
  dark = 'dark',
}

export type THEME_CONTEXT = {
  theme: THEME_TYPE;
  themeConfig: typeof lightTheme | typeof darkTheme;
  toggle: () => void;
};

// Extend styled-components theme
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    toggleBorder: string;
    background: string;
    btnBackgroundColor: string;
    btnTextColor: string;
    hoverBtnTextColor: string;
    colors: {
      black: string;
      white: string;
      purple: string;
      yellow: string;
      blue: string;
      cyan: string;
    };
  }
}
