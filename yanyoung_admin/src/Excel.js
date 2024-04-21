import React, { useState } from "react";
import axios from "axios";

const Excel = () => {
  const [file, setFile] = useState(null);
  const [sheetType, setSheetType] = useState("LECTURE");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sheetType", sheetType);

    axios
      .post("http://localhost:8080/api/v1/student/add/excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <select
          value={sheetType}
          onChange={(e) => setSheetType(e.target.value)}
        >
          <option value="LECTURE">Lecture</option>
          <option value="STUDENT">Student</option>
          <option value="LECTURE">Lecture</option>
          {/* Add more options as needed */}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Excel;
