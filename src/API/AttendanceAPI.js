import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 강의별 출석 조회 API
export const getAttendanceByLectureAndDateAPI = async (lectureId, date) => {
  console.log(lectureId, date);
  try {
    const response = await axios.get(`${local}attendance/lecture`, {
      params: {
        lectureId: lectureId,
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
