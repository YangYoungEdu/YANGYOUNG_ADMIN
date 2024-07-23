import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

// 웹폰트 적용 (내장 폰트를 적용할 경우 개발 환경에 따라 적용이 안되는 경우가 있음)
@font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-style: normal;
    /* font-weight: 600; */
}

html {
    font-size: 16px;
    all: unset;
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard';
}

input {
    all: unset;
    caret-color: #15521D;
}

div {
    all: unset; 
}

select {
    all: unset;
}
button {
    all: unset;
}

h1 {
    all: unset;
}

form {
    all: unset;
}
/* :link {
    all: unset;
} */

:any-link {
    all: unset;
}

tr, th, td {
    text-align: center;
    font-weight: normal;
}

`;


export default GlobalStyles;
