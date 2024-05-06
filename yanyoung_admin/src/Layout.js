import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ReactComponent as Logo } from "./Assets/Logo.svg";
import { theme } from "./style/theme";
import { useRecoilState } from "recoil";
import { loginCheck } from "./Atom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

const Layout = () => {
  const [loginState, setLoginState] = useRecoilState(loginCheck);
  
  const [showLogoutButton, setShowLogoutButton] = useState(true);
  const [showSecondHeader, setShowSecondHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  //로그인 상태에 따라 로그아웃 버튼, 헤더바2, 푸터 표시 여부 변경
  useEffect (() => {
    console.log(loginState);
    setShowLogoutButton(loginState);
    setShowSecondHeader(loginState);
    setShowFooter(!loginState);
  }, [loginState]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* 넷바 */}
        <Header>
          {/* 헤더바 1 */}
          <FirstHeader>
            <StyledLogo />
            {showLogoutButton && <div>로그아웃</div>}
          </FirstHeader>

          {/* 헤더바 2 */}
          {showSecondHeader && (
            <SecondHeader>
              <NavLink to={`/attendance`}>출결 관리</NavLink>
              <NavLink to={`/`}>학생 관리</NavLink>
              <NavLink to={`/`}>수업 관리</NavLink>
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
  height: 81px;
  line-height: 81px;
`;

const FirstHeader = styled.div`
  padding-left: 17.43%;
  @media screen and (max-width: 1250px) {
    padding-left: 5%;
  }
`;

const SecondHeader = styled.div`
  background: ${(props) => props.theme.colors.gray_002};
  font-size: ${(props) => props.theme.fontSizes.MenuBold};
  padding-left: 17.43%;
  @media screen and (max-width: 1250px) {
    padding-left: 5%;
  }
`;
const StyledLogo = styled(Logo)`
  /* margin-left: 17.43%;
  @media screen and (max-width: 1250px) {
    margin-left: 5%;
  } */
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
