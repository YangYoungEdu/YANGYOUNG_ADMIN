import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Plus } from "../../../Assets/Plus.svg";
import { ReactComponent as File } from "../../../Assets/File.svg";
import { ReactComponent as Delete } from "../../../Assets/Delete.svg";
import { ColumnDiv, RowDiv } from "../../../style/CommonStyle";
import { formateDateMD } from "../../../util/Util";
import { uploadFilesAPI } from "../../../API/MaterialAPI";
import { getFilesAPI, deleteFileAPI } from "../../../API/MaterialAPI";

const LectureMaterial = ({ lecture, date }) => {
  const [materials, setMaterials] = useState([]);
  const [addBoxes, setAddBoxes] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const fileInputRef = useRef(null);

  console.log("에러 잡자: ", lecture, date);
  useEffect(() => {
    getFilesAPI(lecture, date).then((res) => {
      setMaterials(res);
    });
  }, [lecture, isUploaded, isDeleted]);

  const uploadMaterials = async () => {
    setIsProgress(true);
    try {
      const res = await uploadFilesAPI(selectedFile, lecture, date);
      console.log(res);
      setIsProgress(false);
      setIsUploaded(true);
      setSelectedFile([]);
      setAddBoxes([]);
      fileInputRef(null);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const deleteMaterial = async (fileName) => {
    try {
      await deleteFileAPI(lecture, date, fileName);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files;
    console.log("선택된 파일:", file);

    if (file.length !== 0 && addBoxes.length === 1) {
      // file 길이 만큼 addBoxes를 추가합니다.
      const newTaskBoxes = [...addBoxes, ...Array(file.length - 1).fill({})];
      setAddBoxes(newTaskBoxes);
      setSelectedFile(file);
    }
  };

  const handleAddTaskBox = () => {
    const newTaskBoxes = [...addBoxes, {}]; // 새 TaskBox를 추가합니다.
    setAddBoxes(newTaskBoxes); // 상태를 업데이트하여 추가된 TaskBox를 반영합니다.
  };

  return (
    <TaskWrapper>
      {materials &&
        materials.length > 0 &&
        materials.map((material, index) => (
          <TaskBox key={index}>
            <TaskContentWrapper>
              <TaskTitleWrapper>
                <TaskTitle>{material.name}</TaskTitle>
                <FileIcon />
              </TaskTitleWrapper>
              <TaskDate>{formateDateMD(material.date)}</TaskDate>
            </TaskContentWrapper>
            <DeleteIcon
              onClick={() => {
                deleteMaterial(material.name);
              }}
            />
          </TaskBox>
        ))}
      {addBoxes.map((addBox, index) => (
        <TaskBox key={index}>
          {selectedFile.length > 0 && (
            <FileUploadInput type="text" value={selectedFile[index].name} />
          )}

          <div onClick={handleFileUploadClick}>
            {/* <FileUploadPlusIcon /> */}
            <FileUploadText>파일 첨부</FileUploadText>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
          </div>

          {/* <UploadingFileDeleteIcon /> */}
        </TaskBox>
      ))}
      <TaskBox>
        <TaskPlusIcon onClick={handleAddTaskBox} />
      </TaskBox>
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  justify-content: center;
  gap: 5px;
`;

const TaskBox = styled(RowDiv)`
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

const PlusIcon = styled(Plus)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TaskPlusIcon = styled(PlusIcon)``;

const TaskTitleWrapper = styled.div``;

const TaskTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
`;

const TaskContentWrapper = styled(ColumnDiv)`
  width: 80%;
  margin-left: 5px;
  margin-right: 45px;
`;

const TaskDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const FileIcon = styled(File)``;

const FileUploadInput = styled.input.attrs({ type: "text" })`
  width: auto;
  display: inline-block;
`;

const FileUploadText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DeleteIcon = styled(Delete)`
  cursor: pointer;
`;

export default LectureMaterial;
