import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;
const prod = process.env.REACT_APP_PROD_URL;

// 강의 전체 조회 API - 달 단위
export const getAllLectureByMonthAPI = async (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  try {
    const response = await axios.get(`${prod}lecture/month`, {
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
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
    throw error;
  }
};

// 강의 전체 조회 API - 주 단위
export const getAllLectureByWeekAPI = async (date) => {
  const fixedDate = new Date(date).toLocaleDateString("en-CA");

  try {
    const response = await axios.get(`${prod}lecture/week`, {
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
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
    throw error;
  }
};

// 강의 전체 조회 API - 일 단위
export const getAllLectureByDayAPI = async (date) => {
  const fixedDate = new Date(date).toLocaleDateString("en-CA");
  console.log ("fixedDate: ", date)
  try {
    const response = await axios.get(`${prod}lecture/day`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        date: fixedDate,
      },
    });
    console.log("일 단위 강의 전체 조회", response.data);
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
    const response = await axios.get(`${prod}lecture/student/${studentId}`, {
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

// 강의 상세 조회 API
export const getOneLectureAPI = async (lectureId) => {
  try {
    const response = await axios.get(`${prod}lecture/${lectureId}`, {
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

// 강의 정보 등록 폼
export const postLecture = async (data) => {
  try {
    const response = await axios.post(`${prod}lecture`, data, {
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

// // 강의 정보 삭제
// export const deleteLecture = async (lectureIds) => {
//   try {
//     const response = await axios.post(`${prod}lecture`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//       params: {
//         lectureIds: lectureIds,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     if (error.response.status === 403) {
//       alert("로그인 후 이용해주세요.");
//       window.location.href = "/";
//     }
//     console.error(error);
//   }
// };

// 강의 정보 수정
export const patchLecture = async (data) => {
  try {
    const response = await axios.patch(`${prod}lecture`, data,{
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


// 강의 수업 날짜 수정
export const patchDateLecture = async (data) => {
  try {
    const response = await axios.patch(`${prod}lecture/date`, data,{
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

// 강의 수정 드래그 앤 드롭 
export const patchDragNDrop = async (data) => {
  try {
    const response = await axios.patch(`${prod}lecture/drag`, data,{
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

// 강의 정보 삭제
export const deleteLecture = async (lectureId,isAllDeleted ) => {
  try {
    const response = await axios.patch(`${prod}lecture/${lectureId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        isAllDeleted: isAllDeleted
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
