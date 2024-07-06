import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../style/theme";

const Navbar = () => {
  const navigate = useNavigate();

  const movePage = (page) => {
    navigate("/" + page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header>
        {/* <StyledLogo /> */}
        <Title>양영학원 고등부 영어과</Title>
      </Header>
      <NavbarContainer>
        <MenuButton
          onClick={() => movePage("attendance")}
          style={{ "padding-left": "195px" }}
        >
          출결 관리
        </MenuButton>
        <MenuButton onClick={() => movePage("lectrue")}>수업 관리</MenuButton>
        <MenuButton onClick={() => movePage("student")}>학생 관리</MenuButton>
        <MenuButton onClick={() => movePage("section")}>분반 관리</MenuButton>
      </NavbarContainer>
    </ThemeProvider>
  );
};

const Header = styled.header`
  height: 81px;
  line-height: 81px;
  background-color: ${(props) => props.theme.colors.primary_normal};
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.Header};
  font-weight: 550;
  color: ${(props) => props.theme.colors.white};
  padding-left: 195px;
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
