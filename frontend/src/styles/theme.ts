import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    border: string;
    fontFamily?: string;
    fontSize?: string;
  }
}

export const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#00BFFF',
  primaryHover: 'rgba(0,191,255,0.6)', 
  secondary: '#f7f7f7',
  border: '#e0e0e0',
  fontFamily: "'Century Gothic', sans-serif", 
  fontSize: '16px',
};

export const darkTheme = {
  background: '#121212',
  text: '#f5f5f5',
  primary: '#4169E1',
  primaryHover: 'rgba(65,105,225,0.6)',
  secondary: '#1e1e1e',
  border: '#333333',
  fontFamily: "'Century Gothic', sans-serif",
  fontSize: '16px',
};

export const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
};

