import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const ThemeExample = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HeaderAndPrimaryNormal>header & primary_normal</HeaderAndPrimaryNormal>
        <Title1AndBrown001>title1 & brown_001</Title1AndBrown001>
      </ThemeProvider>
    </>
  );
};

const HeaderAndPrimaryNormal = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.header};
  color: ${(props) => props.theme.colors.primary_normal};
`;

const Title1AndBrown001 = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.title1};
  color: ${(props) => props.theme.colors.brown_001};
`;

export default ThemeExample;
