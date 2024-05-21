import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

export const getOneStudentTaskAPI = async(studentId) => {
    console.log (studentId);
    try {
        const response = await axios.get(`${server}task/student?studentId=${studentId}`);
        console.log (studentId);
        console.log (response.data);
    } catch (error) {
        console.error(error);
    }
};