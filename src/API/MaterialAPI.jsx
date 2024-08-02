import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;
const prod = process.env.REACT_APP_PROD_URL;

// 강의자료 업로드 API
export const uploadFilesAPI = async (fileList, lectureId, date) => {
  console.log ("업로드 리퀘스트: ", fileList, lectureId, date);
  if (!fileList || !lectureId || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < fileList.length; i++) {
    formData.append("files", fileList[i]);
  }
  formData.append("lecture", lectureId);
  formData.append("date", date);

  console.log("데이터 형식",formData);

  try {
    const response = await axios.post(`${prod}file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    // console.log(response.data);
    // return response.data; 
    alert("File upload completed.");
  } catch (error) {
    if(error.response.status === 403){
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error("Error uploading files:", error);
  }
};

// 강의자료 조회 API
export const getFilesAPI = async (lecture, date) => {
  console.log("lecture:", lecture);
  console.log("date:", date);

  try {
    const response = await axios.get(`${prod}file`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        lectureId: lecture,
        date: date,
      },
    });
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

// 강의자료 다운로드 API - 여러파일 다운로드 시 그냥 여러번 호출 해야 함(왜 안되는지 모르겠음)
export const downloadFileAPI = async (lecture, date, fileName) => {
  try {
    const response = await axios.get(`${prod}file/download`, {
      params: {
        lectureId: lecture,
        date: date,
        fileName: fileName,
      },
    });
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

// 강의자료 삭제 API
export const deleteFileAPI = async (lecture, date, fileName) => {
  console.log("lecture:", lecture);
  console.log("date:", date);
  console.log("fileName:", fileName);

  try {
    const response = await axios.get(`${prod}file/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        lectureId: lecture,
        date: date,
        fileName: fileName,
      },
    });
    console.log("파일 삭제",response.data);
    alert("File deleted.");
  } catch (error) {
    if(error.response.status === 403){
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
    throw error;
  }
};
