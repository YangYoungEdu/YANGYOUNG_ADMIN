import axios from "axios";

// 학생 전체 조회 API

const server = process.env.REACT_APP_DEV_URL;

export const getAllStudentAPI = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${server}student`, {
      params: {
        page,
        size
      }
    });
    console.log(response.data); // 응답 데이터 콘솔에 출력
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};