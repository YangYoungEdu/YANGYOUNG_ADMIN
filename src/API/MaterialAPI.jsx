import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 강의자료 업로드 API
export const uploadFilesAPI = async (fileList, lecture, date) => {
  if (!fileList || !lecture || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    formData.append("files", fileList[i]);
  }
  formData.append("lecture", lecture);
  formData.append("date", date);

  try {
    const response = await axios.post(`${local}file/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    alert("File upload completed.");
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};
// 강의자료 조회 API
export const getFilesAPI = async (lecture, date) => {
  console.log("lecture:", lecture);
  console.log("date:", date);

  try {
    const response = await axios.get(`${local}file`, {
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
