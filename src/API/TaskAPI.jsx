import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

//과제 등록
export const addTaskAPI = async (data) => {
  console.log(data);

  try {
    const response = await axios.post(`${server}task`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    alert("과제가 등록되었습니다.");
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

//특정 학생 과제 조회
export const getOneStudentTaskAPI = async (studentId) => {
  // console.log (studentId);
  try {
    const response = await axios.get(`${server}task/${studentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

//수업별 과제 등록
export const addLectureTaskAPI = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${server}task/lecture`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

//특정 학생 과제 등록
export const postOneStudentTaskAPI = async (data) => {
  try {
    const response = await axios.post(`${server}task/student`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

// 강의별 과제 조회
export const getLectureTaskAPI = async (lectureId) => {
  console.log(lectureId);
  try {
    const response = await axios.get(`${server}task/lecture/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

// 과제 삭제 - 1개
export const deleteTaskAPI = async (taskId) => {
  try {
    const response = await axios.delete(`${server}task/single`, {
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
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

export const patchTaskProgressAPI = async (studentId, taskId, taskProgress) => {
  try {
    const response = await axios.patch(`${server}task/student/progress`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        studentId: studentId,
        taskId: taskId,
        taskProgress: taskProgress,
      },
    });
    console.log(response.data);
    alert("과제가 삭제되었습니다.");
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};
