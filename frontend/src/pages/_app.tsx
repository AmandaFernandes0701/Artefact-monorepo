import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { lightTheme } from '../styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <ToastContainer 
        autoClose={2000} 
        pauseOnHover={true} 
        limit={1}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
