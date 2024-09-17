import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #ffffff;
    --text: #333333;
    --primary: #ff69b4;
    --secondary: #f0f0f0;
    --accent: #ff1493;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #1a1a1a;
      --text: #f0f0f0;
      --primary: #ff69b4;
      --secondary: #2a2a2a;
      --accent: #ff1493;
    }
  }

  body {
    background-color: var(--background);
    color: var(--text);
  }
`;

export default GlobalStyles;
