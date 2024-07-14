import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 로그인
export const signIn = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(`${server}appUser/sign-in`, data);
    console.log("Sign in response:", response.data);
    return response.data;
  } catch (error) {
    const errorName = error.response.data.message;
    const errorMessage = error.response.data.message;

    switch (errorName) {
      case "USERNAME_NOT_FOUND":
        alert(errorMessage);
        throw new Error(errorMessage);
      case "PASSWORD_NOT_MATCH":
        alert(errorMessage);
        throw new Error(errorMessage);
      default:
        alert(errorMessage);
        throw new Error(errorMessage);
    }
  }
};

// 로그아웃
export const signOut = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.post(`${server}appUser/sign-out`, {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    console.log("Sign out response:", response.data);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message;
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};
