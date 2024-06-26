import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

// 학생 전체 조회 API

export const getAllStudentAPI = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(`${server}student`, {
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
    const response = await axios.get(`${server}student/hidden`, {
      params: {
        page,
        size,
      },
    });
    console.log (response.data);
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
    size: 10
  };

  try {
    const response = await axios.get(`${server}student/search`, data);
    console.log (response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

//학생 상세 조회 API
export const getOneStudentAPI = async (id) => {
  try {
    const response = await axios.get(`${server}student/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//학생 정보 수정 API
export const patchStudentAPI = async (data) => {
  try {
    const response = await axios.patch(`${server}student`, data);
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

    const response = await axios.delete(`${server}student?${queryString}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

//학생 숨김 처리 API
export const hideStudentAPI = async (idList) => {
  const studentIdList = {
    "studentIdList": idList,
  };
  console.log(studentIdList);
  try {
    const response = await axios.patch(`${server}student/hidden`, studentIdList);
    console.log(response);
    alert("선택한 학생이 퇴원처리 되었습니다.");
  } catch (error) {
    console.error(error);
  }
};
