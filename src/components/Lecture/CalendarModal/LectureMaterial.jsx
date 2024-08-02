import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Plus } from "../../../Assets/Plus.svg";
import { ReactComponent as File } from "../../../Assets/File.svg";
import { ReactComponent as Delete } from "../../../Assets/Delete.svg";
import { ReactComponent as Remove } from "../../../Assets/Remove.svg"; // Add a remove icon
import { formateDateMD } from "../../../util/Util";
import {
  uploadFilesAPI,
  getFilesAPI,
  deleteFileAPI,
} from "../../../API/MaterialAPI";
import { ColumnDiv } from "../../../style/CommonStyle";

const LectureMaterial = ({ lecture, date }) => {
  const [materials, setMaterials] = useState([]);
  const [addBoxes, setAddBoxes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const fileInputRef = useRef(null);
  
  console.log("수업자료 날짜", materials)

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await getFilesAPI(lecture, date);
        setMaterials(res);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchMaterials();
  }, [lecture, date, isUploaded, isDeleted]);

  const uploadMaterials = async () => {
    try {
      console.log("selectedFiles", selectedFiles);
      await uploadFilesAPI(selectedFiles, lecture, date);
      setIsUploaded(true);
      setSelectedFiles([]);
      setAddBoxes([]); // Clear add boxes after upload
      fileInputRef.current.value = null; // Reset file input
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const deleteMaterial = async (fileName, fimeDate) => {
    try {
      await deleteFileAPI(lecture, fimeDate, fileName);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      setAddBoxes((prevBoxes) => [
        ...prevBoxes,
        ...Array(files.length).fill({}),
      ]);
      console.log("selectedFiles", selectedFiles);
      console.log("addBoxes", addBoxes);
    }
  };

  const handleSave = async () => {
    await uploadMaterials();
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setAddBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
  };

  const handleAddTaskBox = () => {
    fileInputRef.current.click();
  };

  return (
    <TaskWrapper>
      {materials.length > 0 &&
        materials.map((material, index) => (
          <TaskBox key={index}>
            <TaskContentWrapper>
              <TaskTitleWrapper>
                <TaskTitle>{material.name}</TaskTitle>
                <File />
              </TaskTitleWrapper>
              <TaskDate>{formateDateMD(material.date)}</TaskDate>
            </TaskContentWrapper>
            <DeleteIcon onClick={() => deleteMaterial(material.name, material.date)} />
          </TaskBox>
        ))}

      {addBoxes.map((_, index) => (
        <TaskBox key={index}>
          {selectedFiles[index] && (
            <Wrapper>
              <FileUploadInput
                type="text"
                value={selectedFiles[index].name}
                readOnly
              />
              <RemoveIcon onClick={() => handleRemoveFile(index)} />
            </Wrapper>
          )}
        </TaskBox>
      ))}

      <TaskBox>
        <TaskPlusIcon onClick={handleAddTaskBox} />
      </TaskBox>

      <SaveButton on onClick={handleSave}>
        저장
      </SaveButton>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
    </TaskWrapper>
  );
};

// Styled Components
const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: auto;
  gap: 5px;
`;

const TaskBox = styled.div`
  display: flex;
  width: 100%;
  height: 84px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  padding: 3%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const TaskContentWrapper = styled(ColumnDiv)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TaskTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
`;

const TaskTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const FileIcon = styled(File)`
  margin-left: 10px;
`;

const TaskDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const DeleteIcon = styled(Delete)`
  cursor: pointer;
`;

const FileUploadInput = styled.input`
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
  height: 100%;
`;

const RemoveIcon = styled(Remove)`
  cursor: pointer;
`;
const TaskPlusIcon = styled(Plus)`
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #95c25c;
  color: white;
  border: none;
  box-sizing: border-box;
  padding: 5px 20px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-size: 13px;
`;

export default LectureMaterial;
