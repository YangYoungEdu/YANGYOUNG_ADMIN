import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Footer />
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
