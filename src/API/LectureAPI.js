import axios from "axios";

// 강의 전체 조회 API - 달 단위
export const getAllLectureByMonthAPI = async (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

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

// 강의 전체 조회 API - 주 단위
export const getAllLectureByWeekAPI = async (date) => {
  const fixedDate = new Date(date).toLocaleDateString("en-CA");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DEV_URL}lecture/week`,
      {
        params: {
          date: fixedDate,
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

// 강의 전체 조회 API - 일 단위
export const getAllLectureByDayAPI = async (date) => {
  const fixedDate = new Date(date).toLocaleDateString("en-CA");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DEV_URL}lecture/day`,
      {
        params: {
          date: fixedDate,
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
