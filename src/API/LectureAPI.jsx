import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 강의 전체 조회 API - 달 단위
export const getAllLectureByMonthAPI = async (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  try {
    const response = await axios.get(`${local}lecture/month`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        year: year,
        month: month,
      },
    });
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
    const response = await axios.get(`${local}lecture/week`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        date: fixedDate,
      },
    });
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
    const response = await axios.get(`${local}lecture/day`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        date: fixedDate,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요!");
    }
    console.error(error);
    throw error;
  }
};

// 특정 학생이 수강하는 강의 조회 API
export const getLectureByStudentAPI = async (studentId) => {
  try {
    const response = await axios.get(`${local}lecture/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 강의 상세 조회 API
export const getOneLectureAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${local}lecture/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
