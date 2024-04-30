import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "./Assets/Logo.svg";

const Layout = () => {
  return (
    <div>
      {/* 넷바 */}
      <Header>
        {/* 헤더바 1 */}
        <div>
          <StyledLogo />
          <div>로그아웃</div>
        </div>

        {/* 헤더바 2 */}
        <div>
          <NavLink to={`/`}>출결 관리</NavLink>
          <NavLink to={`/`}>학생 관리</NavLink>
          <NavLink to={`/`}>수업 관리</NavLink>
          <NavLink to={`/`}>분반 관리</NavLink>
        </div>
      </Header>

      {/* 컨텐츠 */}
      <main>
        <Outlet />
      </main>

      {/* 푸터 */}
      <Footer>
        <FooterPadding>
          <BoldText>양영학원</BoldText>
          <Texts>
            <div>주소 : 대전 서구 둔산로 136</div>
            <div>번호 : 042-486-4245 </div>
          </Texts>
        </FooterPadding>
      </Footer>
    </div>
  );
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 81px;
  line-height: 81px;
`;

const StyledLogo = styled(Logo)`
  margin-left: 17.43%;
  @media screen and (max-width: 1250px) {
    margin-left: 5%;
  }
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
  font-weight: bold;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-weight: regular;
`;
export default Layout;
