import styled from "styled-components";
import { ReactComponent as Logo } from "../Assets/Logo.svg";
import { theme } from "../style/theme";
import { ThemeProvider } from "styled-components";

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <StyledLogo />
        <NavbarContainer>
          <MenuButton style={{ "margin-left": "195px" }}>출결 관리</MenuButton>
          <MenuButton>수업 관리</MenuButton>
          <MenuButton>학생 관리</MenuButton>
          <MenuButton>분반 관리</MenuButton>
        </NavbarContainer>
      </Header>
    </ThemeProvider>
  );
};

const Header = styled.header`
  height: 81px;
  line-height: 81px;
`;

const StyledLogo = styled(Logo)`
  margin-left: 17.43%;
  @media screen and (max-width: 1250px) {
    margin-left: 5%;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  background-color: ${(props) => props.theme.colors.gray_002};
`;

const MenuButton = styled.button`
  color: ${(props) => props.theme.colors.gray_006};
  border: none;
  cursor: pointer;
  margin: 0;
  outline: none;
`;

export default Navbar;
