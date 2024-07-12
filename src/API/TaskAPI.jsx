import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

//과제 등록
export const addTaskAPI = async (data) => {
  console.log(data);

  try {
    const response = await axios.post(`${local}task`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    alert("과제가 등록되었습니다.");
  } catch (error) {
    if(error.response.status === 403){
      alert("로그인 후 이용해주세요!");
    }
    console.error(error);
  }
};

//특정 학생 과제 조회
export const getOneStudentTaskAPI = async (studentId) => {
  // console.log (studentId);
  try {
    const response = await axios.get(`${local}task/${studentId}`, {
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

//수업별 과제 등록
export const addLectureTaskAPI = async (data) => {
  try {
    const response = await axios.post(`${local}task/lecture`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

//특정 학생 과제 등록
export const postOneStudentTaskAPI = async (data) => {
  try {
    const response = await axios.post(`${local}task/student`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// 강의별 과제 조회
export const getLectureTaskAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${local}task/lecture/${lectureId}`, {
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

// 과제 삭제 - 1개
export const deleteTaskAPI = async (taskId) => {
  try {
    const response = await axios.delete(`${local}task/single`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        taskId: taskId,
      },
    });
    console.log(response.data);
    alert("과제가 삭제되었습니다.");
  } catch (error) {
    console.error(error);
  }
};
