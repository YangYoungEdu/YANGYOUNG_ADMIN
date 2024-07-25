import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

const accessToken = localStorage.getItem("accessToken");

// 학생 전체 조회 API
export const getAllStudentAPI = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(`${server}student`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
    throw error;
  }
};

// 숨김 학생 전체 조회 API
export const getHiddenStudentAPI = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(`${server}student/hidden`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        size,
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

// 학생 검색 API
export const searchStudentAPI = async (nameList, schoolList, gradeList) => {
  try {
    const response = await axios.get(`${server}student/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        nameList: nameList,
        schoolList: schoolList,
        gradeList: gradeList,
        page: 1,
        size: 10,
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

//학생 상세 조회 API
export const getOneStudentAPI = async (id) => {
  try {
    const response = await axios.get(`${server}student/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

//학생 정보 수정 API
export const patchStudentAPI = async (data) => {
  try {
    const response = await axios.patch(`${server}student`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data);
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

//학생 정보 삭제 API
export const deleteStudentAPI = async (idList) => {
  console.log(idList);
  try {
    const queryString = idList.map((id) => `idList=${id}`).join("&");

    const response = await axios.delete(`${server}student?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

//학생 숨김 처리 API
export const hideStudentAPI = async (idList) => {
  const studentIdList = {
    studentIdList: idList,
  };
  console.log(studentIdList);
  try {
    const response = await axios.patch(
      `${server}student/hidden`,
      studentIdList,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    alert("선택한 학생이 퇴원처리 되었습니다.");
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};

// 강의별 학생 조회 API
export const getStudentByLectureAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${server}student/lecture/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
  }
};
