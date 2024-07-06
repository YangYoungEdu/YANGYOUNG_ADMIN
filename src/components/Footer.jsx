import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterPadding>
        <BoldText>양영학원</BoldText>
        <Text>주소 : 대전 서구 둔산로 136</Text>
        <Text>번호 : 042-486-4245 </Text>
      </FooterPadding>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  height: 271px;
  background: #f9f9f9;
  padding-left: 17.43%;
  @media screen and (max-width: 1250px) {
    padding-left: 5%;
  }
`;

const FooterPadding = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17.71px;
  padding-top: 45px;
`;

const BoldText = styled.div`
  font-family: "Roboto";
  font-size: 22px;
  font-weight: bold;
`;

const Text = styled.div`
  font-weight: normal;
  margin-top: 11px;
`;

export default Footer;
