import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

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
// export const getOneStudentTaskAPI = async (studentId) => {
//   console.log(studentId);
//   try {
//     const response = await axios.get(
//       `${server}task/student?studentId=${studentId}`
//     );
//     console.log(studentId);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

//특정 학생 과제 등록
export const postOneStudentTaskAPI = async (data) => {
  try {
    const response = await axios.post(`${server}task/student`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
