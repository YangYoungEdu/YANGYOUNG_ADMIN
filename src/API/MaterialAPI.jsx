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
    formData.append("fileList", fileList[i]);
  }
  formData.append("lectureId", lectureId);
  formData.append("date", date);

  console.log("데이터 형식",formData);

  try {
    const response = await axios.post(`${prod}file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    alert("File upload completed.");
    return response.data; 
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

export const downloadFileAPI = async (lectureId, lectureDate, fileName) => {
  console.log("download api requests: ", lectureId, lectureDate, fileName);
  try {
    const response = await axios.get(`${prod}file/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        lectureId: lectureId,
        date: lectureDate,
        fileName: fileName,
      },
      responseType: "blob",
    });

    const fileBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const contentDisposition = response.headers["content-disposition"];
    const downloadFileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : fileName;

    const fileURL = window.URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", downloadFileName);
    document.body.appendChild(link);
    link.click();

    // 리소스 해제
    link.remove();
    window.URL.revokeObjectURL(fileURL);

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    } else {
      console.error("파일 다운로드 실패:", error);
    }
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
