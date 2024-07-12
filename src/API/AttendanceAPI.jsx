import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 강의별 출석 조회 API
export const getAttendanceByLectureAndDateAPI = async (lectureId, date) => {
  console.log(lectureId, date);
  try {
    const response = await axios.get(`${local}attendance/lecture`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        lectureId: lectureId,
        date: date,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if(error.response.status === 403){
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    };
    console.error(error);
    throw error;
  }
};

// 출석 정보 업데이트 API
export const updateAttendanceAPI = async (attendanceList) => {
  console.log(attendanceList.length);
  try {
    const response = await axios.patch(`${local}attendance`, attendanceList, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if(error.response.status === 403){
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
    throw error;
  }
};
