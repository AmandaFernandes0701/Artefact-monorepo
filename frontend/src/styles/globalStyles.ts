import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Century Gothic', sans-serif;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    width: 100%;
    background-color: magenta;
    height: 100%;
    line-height: 1.5;
    color: ${(props) => props.theme.text};
  }

  h1, h2, h3 {
    margin: 0;
    font-weight: normal;
  }

  button {
    border: none;
    cursor: pointer;
    outline: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;