import axios from "axios";

// 강의 전체 조회 API - 달 단위
export const getAllLectureByMonthAPI = async (year, month) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DEV_URL}lecture/month`,
      {
        params: {
          year: year,
          month: month,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
