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
    caret-color: #15521D;
}

div {
    all: unset; 
}

/* :link {
    all: unset;
} */

:any-link {
    all: unset;
}
`;

export default GlobalStyles;
