import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

//과제 등록
export const addTaskAPI = async (data) => {
  console.log(data);

  try {
    const response = await axios.post(`${local}task`, data);
    console.log(response.data);
    alert("과제가 등록되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

//특정 학생 과제 조회
export const getOneStudentTaskAPI = async (studentId) => {
  // console.log (studentId);
  try {
    const response = await axios.get(`${server}task/${studentId}`);
    console.log (response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//특정 학생 과제 등록
export const postOneStudentTaskAPI = async (data) => {
  try {
    const response = await axios.post(`${server}task/student`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// 강의별 과제 조회
export const getLectureTaskAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${local}task/lecture/${lectureId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
