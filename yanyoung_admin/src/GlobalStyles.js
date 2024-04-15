import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

html {
    font-size: 16px;
    all: unset;
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

input {
    all: unset;
}

div {
    all: unset; 
}
`;

export default GlobalStyles;
