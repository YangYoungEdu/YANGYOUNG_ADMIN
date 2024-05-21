import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { useRecoilState } from "recoil";
import { loginCheck } from "./Atom";
import Navbar from "./components/Navbar";
import { act } from "react";
// import Footer from "./components/Footer";

const Layout = () => {
  const [loginState, setLoginState] = useRecoilState(loginCheck);

  const [showLogoutButton, setShowLogoutButton] = useState(true);
  const [showSecondHeader, setShowSecondHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  //로그인 상태에 따라 로그아웃 버튼, 헤더바2, 푸터 표시 여부 변경
  useEffect(() => {
    console.log(loginState);
    setShowLogoutButton(loginState);
    setShowSecondHeader(loginState);
    setShowFooter(!loginState);
  }, [loginState]);

  // 특정 페이지가 활성화될 경우 메뉴의 스타일
  const activeStyle = {
    color: "#15521D",
    fontWeight: "bold"
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* 넷바 */}
        <Header>
          {/* 헤더바 1 */}
          <FirstHeader isLoggedIn={loginState}>
            <Logo isLoggedIn={loginState}>양영학원 고등부 영어과</Logo>
            {showLogoutButton && <LogOut>로그아웃</LogOut>}
          </FirstHeader>

          {/* 헤더바 2 */}
          {showSecondHeader && (
            <SecondHeader>
              <NavLink to={`/attendance`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>출결 관리</NavLink>
              <NavLink to={`/student`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>학생 관리</NavLink>
              <NavLink to={`/`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>수업 관리</NavLink>
            </SecondHeader>
          )}
        </Header>

        {/* 컨텐츠 */}
        <main>
          <Outlet />
        </main>

        {/* 푸터 */}
        {showFooter && (
          <Footer>
            <FooterPadding>
              <BoldText>양영학원</BoldText>
              <Texts>주소 : 대전 서구 둔산로 136</Texts>
              <Texts>번호 : 042-486-4245 </Texts>
            </FooterPadding>
          </Footer>
        )}
      </ThemeProvider>
    </div>
  );
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
`;

const FirstHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 69px;
  line-height: 69px;
  padding-left: 13.54%;
  padding-right: 13.54%;
  justify-content: space-between;
  background-color: ${(props) => (props.isLoggedIn ? "#15521D" : "#fff")};
  @media screen and (max-width: 1250px) {
    padding-left: 5%;
  }
`;

const SecondHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 49px;
  line-height: 49px;
  background: ${(props) => props.theme.colors.gray_002};
  color: ${(props) => props.theme.colors.gray_006};
  font-size: ${(props) => props.theme.fontSizes.MenuBold};
  padding-left: 13.54%;
  white-space: nowrap;
  gap: 25px;
  @media screen and (max-width: 1250px) {
    padding-left: 5%;
  }
  a {
    cursor: pointer;
  }

`;

const Logo = styled.div`
  white-space: nowrap;
  color: ${(props) => (props.isLoggedIn ? "#fff" : "#000")};
  font-size: ${(props) => props.theme.fontSizes.Header};
  font-weight: 500;
  cursor: pointer;
`;

const LogOut = styled.div`
  color: white;
  cursor: pointer;
`;

const Footer = styled.footer`
  height: 271px;
  background: #f9f9f9;
`;

const FooterPadding = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 17.43%;
  gap: 17.71px;
  @media screen and (max-width: 1250px) {
    margin-left: 5%;
  }
`;
const BoldText = styled.div`
  padding-top: 45px;
  font-family: "Roboto";
  font-size: 22px;
  color: ${(props) => props.theme.colors.gray_006};
  font-weight: bold;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-weight: regular;
  font-size: 16px;
`;
export default Layout;
