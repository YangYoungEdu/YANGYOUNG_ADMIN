import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

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

//특정 학생에게 할당된 과제 조회 API
export const getOneStudentLectureAPI = async (studentId) => {
  try {
    const response = await axios.get(`${server}lecture/student/${studentId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 강의 상세 조회 API
export const getOneLectureAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${server}lecture/${lectureId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
