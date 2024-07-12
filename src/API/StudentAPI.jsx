import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 학생 전체 조회 API
export const getAllStudentAPI = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(`${local}student`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 숨김 학생 전체 조회 API
export const getHiddenStudentAPI = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(`${local}student/hidden`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 학생 검색 API
export const searchStudent = async () => {
  const data = {
    nameList: [],
    schoolList: ["동대전고"],
    gradeList: [],
    page: 1,
    size: 10,
  };

  try {
    const response = await axios.get(`${local}student/search`, data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

//학생 상세 조회 API
export const getOneStudentAPI = async (id) => {
  try {
    const response = await axios.get(`${local}student/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//학생 정보 수정 API
export const patchStudentAPI = async (data) => {
  try {
    const response = await axios.patch(`${local}student`, data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//학생 정보 삭제 API
export const deleteStudentAPI = async (idList) => {
  console.log(idList);
  try {
    const queryString = idList.map((id) => `idList=${id}`).join("&");

    const response = await axios.delete(`${local}student?${queryString}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
  } catch (error) {
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
      studentIdList,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    alert("선택한 학생이 퇴원처리 되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

// 강의별 학생 조회 API
export const getStudentByLectureAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${local}student/lecture/${lectureId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
