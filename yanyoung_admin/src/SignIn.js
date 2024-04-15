import styled from "styled-components";
import { ReactComponent as SignInImage } from "./Assets/SignInImage.svg";
import { ReactComponent as MailIcon } from "./Assets/Mail.svg";
import { ReactComponent as PWIcon } from "./Assets/PW.svg";
import { ReactComponent as GoogleIcon } from "./Assets/Google.svg";

function SignIn() {
  return (
    <>
      <Div>
        <StyledSignInImage />

        <RightHalf>

            {/* text field */}
          <LoginForm>

            <TextInputBox>
              <MailIcon />
              <TextInput type="text" placeholder="아이디" />
            </TextInputBox>

            <TextInputBox>
              <PWIcon />
              <TextInput type="text" placeholder="비밀번호" />
            </TextInputBox>

          </LoginForm>

           {/* buttons */}
          <LoginForm>

            <LoginButton background={'#15521D'} color={'white'}>Login</LoginButton>
            <LoginButton background={'#EFEFEF'}>
              <GoogleIcon />
              Google 로그인
            </LoginButton>

          </LoginForm>

        </RightHalf>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 721px;
  gap: 10.12%;
`;

const StyledSignInImage = styled(SignInImage)`
  width: 30.06%;
`;

const RightHalf = styled.div`
  display: flex;
  flex-direction: column;
  width: 30.06%;
  font-weight: bold;
  gap: 35px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const TextInputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 24px;
  align-items: center;
  width: 397px;
  height: 57px;
  border-radius: 9px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
    @media screen and (max-width: 1080px) {
    width: 100%;
  }
`;

const TextInput = styled.input`
  margin-left: 13px;
  font-weight: lighter;
    ::placeholder{
        color: #bababa;
    }
`;

const LoginButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 421px;
  height: 57px;
  border-radius: 9px;
  font-size: 20px;
  background: ${({ background }) => background};
  color: ${(color) => color};
  cursor: pointer;

   @media screen and (max-width: 1080px) {
    width: 110%;
  }
`;

export default SignIn;
