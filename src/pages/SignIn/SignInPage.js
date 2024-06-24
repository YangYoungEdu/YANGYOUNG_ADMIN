import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SignInImage } from "../../Assets/SignInImage.svg";
import { ReactComponent as MailIcon } from "../../Assets/Mail.svg";
import { ReactComponent as PWIcon } from "../../Assets/PW.svg";
import { ReactComponent as GoogleIcon } from "../../Assets/Google.svg";
import { useRecoilState } from "recoil";
import { loginCheck } from "../../Atom";
import { signIn } from "../../API/AuthAPI";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useRecoilState(loginCheck);

  // 텍스트 필드 포커스 상태 관리
  const [isMailFocused, setIsMailFocused] = useState(false);
  const [isPWFocused, setIsPWFocused] = useState(false);

  const navigate = useNavigate();

  // signup 페이지로 이동시 로그아웃
  useEffect(() => {
    setLoginState(false);
  }, []);

  // 로그인 버튼 클릭 시 페이지 이동 및 로그인 상태 변수 관리
  const handleLoginClick = async () => {
    signIn(username, password).then((res) => {
      setLoginState(true);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      navigate("/lecture");
    });
  };

  return (
    <>
      <Div>
        <StyledSignInImage />

        <RightHalf>
          {/* text field */}
          <LoginForm>
            <TextInputBox isFocused={isMailFocused}>
              <MailIcon
                fill={isMailFocused ? "#15521D" : "#929292"}
                fillOpacity={isMailFocused ? "1" : "0.54"}
              />
              <TextInput
                onFocus={() => setIsMailFocused(true)}
                onBlur={() => setIsMailFocused(false)}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="아이디"
              />
            </TextInputBox>

            <TextInputBox isFocused={isPWFocused}>
              <PWIcon
                fill={isPWFocused ? "#15521D" : "#929292"}
                fillOpacity={isPWFocused ? "1" : "0.54"}
              />
              <TextInput
                onFocus={() => setIsPWFocused(true)}
                onBlur={() => setIsPWFocused(false)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="비밀번호"
              />
            </TextInputBox>
          </LoginForm>

          {/* buttons */}
          <LoginForm>
            <LoginButton
              background={"#15521D"}
              color={"white"}
              onClick={handleLoginClick}
            >
              Login
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
  border: ${({ isFocused }) => (isFocused ? "1px solid #15521D" : "none")};
  box-shadow: 0 0 0 1px #e0e0e0 inset;
  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`;

const TextInput = styled.input`
  margin-left: 13px;
  font-weight: lighter;
  font-size: ${(props) => props.theme.fontSizes.textField1};
  color: ${(props) => props.theme.colors.black};
  ::placeholder {
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
