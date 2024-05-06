import axios from "axios";

// 학생 등록 API
export const addStudentAPI = async (studentData) => {
  try {
    const response = await axios.post(
      // process.env.REACT_APP_DEV_URL + `student`,
      process.env.REACT_APP_URL + `student`,
      studentData
    );

    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// 학생 전체 조회 API
export const getAllStudentAPI = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_DEV_URL + `student`
    //   process.env.REACT_APP_URL + `/student`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 학생 상세 조회 API
export const getOneStudentAPI = async (id) => {
  try {
    const response = await axios.get(
      // process.env.REACT_APP_DEV_URL + `student/${id}`
      process.env.REACT_APP_URL + `student/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 학생 정보 수정 API
export const updateStudentInfoAPI = async (studentData) => {
  try {
    const response = await axios.patch(
      // 'http://localhost:8080/api/v0/student',
      // process.env.REACT_APP_DEV_URL + `student`,
      process.env.REACT_APP_URL + `student`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("학생 정보 수정 중 오류 발생: ", error);
    throw error;
  }
};

// 학생 정보 삭제 API
export const deleteStudentAPI = async (id) => {
  try {
    await axios.delete(
      // process.env.REACT_APP_DEV_URL + `student/${id}`, 
      process.env.REACT_APP_URL + `student/${id}`, 
      id);
  } catch (error) {
    console.error("학생 삭제 중 오류 발생:", error);
    throw error;
  }
};
