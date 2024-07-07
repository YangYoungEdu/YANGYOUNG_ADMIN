import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
import { ReactComponent as File } from "../../Assets/File.svg";
import { ReactComponent as Delete } from "../../Assets/Delete.svg";
import { ColumnDiv, RowDiv } from "../../style/CommonStyle";
import { formateDateMD } from "../../util/Util";
import { uploadFilesAPI } from "../../API/MaterialAPI";
import { getFilesAPI, deleteFileAPI } from "../../API/MaterialAPI";

const LectureMaterial = ({ id, lecture, date }) => {
  const [materials, setMaterials] = useState([]);
  const [addBoxes, setAddBoxes] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getFilesAPI(lecture, date).then((res) => {
      setMaterials(res);
    });
  }, [isUploaded, isDeleted]);

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
          <AddMaterialWrapper>
            {selectedFile && selectedFile.length > 0 ? (
              <FileUploadInput
                type="text"
                placeholder="자료 이름을 입력하세요"
                value={selectedFile[index].name}
                readOnly
              />
            ) : (
              <FileUploadInput
                type="text"
                placeholder="자료 이름을 입력하세요"
                value=""
              />
            )}
            <FileUploadWrapper onClick={handleFileUploadClick}>
              <FileUploadPlusIcon />
              <FileUploadText>파일 첨부</FileUploadText>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
            </FileUploadWrapper>
          </AddMaterialWrapper>
          <UploadingFileDeleteIcon />
        </TaskBox>
      ))}
      <TaskBox>
        <TaskPlusIcon onClick={handleAddTaskBox} />
      </TaskBox>
      <UploadButton>
        {isProgress ? (
          <UploadButtonText>업로드 중...</UploadButtonText>
        ) : (
          <UploadButtonText onClick={uploadMaterials}>업로드</UploadButtonText>
        )}
      </UploadButton>
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column; */
  /* align-items: center; */
  padding-left: 9.5%;
  overflow: auto;
`;
const TaskBox = styled(RowDiv)`
  display: flex;
  /* flex-direction: column; */
  width: 90%;
  height: 86px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 2.5px 0px;
  /* padding: 18.5px 0 0 23px; */
  box-sizing: border-box;
`;

const PlusIcon = styled(Plus)`
  width: 14px;
  height: 14px;
  padding-left: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TaskPlusIcon = styled(PlusIcon)`
  margin: 37px 360px 0px -10px;
  /* margin-top: 20px; */
`;

const TaskTitleWrapper = styled.div`
  display: flex;
  padding-bottom: 9px;
  padding-top: 2px;
  /* height: 20px; */
`;

const TaskTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  padding-right: 9px;
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

const FileIcon = styled(File)`
  width: 10px;
  height: 15px;
  padding-top: 2.5px;
`;

const AddMaterialWrapper = styled(RowDiv)`
  justify-content: flex-start;
  width: 80%;
  padding-left: 8px;
  padding-right: 60px;
`;

const FileUploadWrapper = styled(RowDiv)`
  width: 80px;
  height: 30px;
  margin-top: 26px;
  background-color: #f1f1f1;
  border-radius: 3px;
  cursor: pointer;
`;

const FileUploadInput = styled.input.attrs({ type: "text" })`
  /* width: auto;
  display: inline-block; */
  padding-left: 13px;
  padding-bottom: 6px;
`;

const FileUploadText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #555555;
  padding-top: 5.5px;
  padding-right: 3px;
`;

const FileUploadPlusIcon = styled(Plus)`
  width: 7px;
  height: 7px;
  padding-top: 11px;
  padding-right: 5px;
  padding-left: 4px;
`;

const UploadButton = styled(TaskBox)`
  background-color: #15521d;
  justify-content: center;
  align-items: center;
  /* padding-top: -10px; */
  cursor: pointer;
`;

const UploadButtonText = styled.div`
  color: white;
  font-size: 20px;
  margin-top: -12px;
  margin-left: -35px;
`;

const DeleteIcon = styled(Delete)`
  padding-top: 31px;
  /* margin-right: -30px; */
  cursor: pointer;
`;

const UploadingFileDeleteIcon = styled(DeleteIcon)`
  width: 20px;
  height: 20px;
  padding-right: 20px;
`;

export default LectureMaterial;
