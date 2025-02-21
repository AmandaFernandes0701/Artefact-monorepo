import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
  }
}

export const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#00BFFF',
  secondary: '#f7f7f7',
  border: '#e0e0e0',
  fontFamily: "'Century Gothic', sans-serif", 
  fontSize: '16px',
};

export const darkTheme = {
  background: '#121212',
  text: '#f5f5f5',
  primary: '#4169E1', 
  secondary: '#1e1e1e',
  border: '#333333',
  fontFamily: "'Century Gothic', sans-serif",
  fontSize: '16px',
};

