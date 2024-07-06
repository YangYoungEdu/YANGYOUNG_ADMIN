import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 강의자료 업로드 API
export const uploadFilesAPI = async (fileList, lecture, date) => {
  const request = {
    fileList: fileList,
    lecture: lecture,
    date: date,
  };

  try {
    const response = await axios.post(`${local}file/upload`, request);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 강의자료 조회 API
export const getFilesAPI = async (lecture, date) => {
  try {
    const response = await axios.get(`${local}file/list`, {
      params: {
        lecture: lecture,
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 강의자료 다운로드 API - 여러파일 다운로드 시 그냥 여러번 호출 해야 함(왜 안되는지 모르겠음)
export const downloadFileAPI = async (lecture, date, fileName) => {
  try {
    const response = await axios.get(`${local}file/download`, {
      params: {
        lecture: lecture,
        date: date,
        fileName: fileName,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
