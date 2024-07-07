import { useState } from "react";
import styled from "styled-components";
import { addLectureTaskAPI } from "../../../API/TaskAPI";
import { ReactComponent as XIcon } from "../../../Assets/XIcon.svg";
import { ColumnDiv, RowDiv } from "../../../style/CommonStyle";

const LectureTaskAddModal = ({ setIsUploaded, setIsModalOpen, id }) => {
  const [newTask, setNewTask] = useState({
    lectureId: id,
    content: "",
    taskDate: "",
  });

  const addLectureTask = async () => {
    try {
      if (newTask.content === "" || newTask.taskDate === "") {
        alert("모든 항목을 입력해주세요.");
        return;
      }
  
      await addLectureTaskAPI(newTask);
      setIsModalOpen(false);
      setIsUploaded(true);
      alert("과제가 등록되었습니다.");
    } catch (error) {
      console.error("Error adding lecture task:", error);
    }
  };
  

  const handleChangeInput = (e, type) => {
    switch (type) {
      case "content":
        setNewTask({ ...newTask, content: e.target.value });
        break;
      case "taskDate":
        setNewTask({ ...newTask, taskDate: e.target.value });
        break;
      default:
        break;
    }
  };

  // ToDo: Validation

  return (
    <Overlay>
      <Modal>
        <HeaderWrapper>
          <Title1>과제 등록</Title1>
          <CancelIcon onClick={() => setIsModalOpen(false)} />
        </HeaderWrapper>

        <ColumnWrapper>
          <SubTitle2>과제 이름</SubTitle2>
          <NameInput
            type="text"
            placeholder="입력"
            onChange={(e) => handleChangeInput(e, "content")}
          />
        </ColumnWrapper>

        <ColumnDiv>
          <SubTitle2>마감일</SubTitle2>
          <DueDateInput
            type="date"
            onChange={(e) => handleChangeInput(e, "taskDate")}
          />
        </ColumnDiv>

        <SaveButton onClick={() => addLectureTask()}>저장</SaveButton>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998; /* Modal보다 뒤에 배치 */
`;

const Modal = styled.div`
  width: 50vw;
  height: 100vh;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 32.37px 60px;
  box-sizing: border-box;
  z-index: 999;
`;

const HeaderWrapper = styled(RowDiv)`
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ColumnWrapper = styled(ColumnDiv)`
  margin-bottom: 37px;
`;

const CancelIcon = styled(XIcon)`
  cursor: pointer;
`;

const Title1 = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const SubTitle2 = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 4px;
`;

const NameInput = styled.input.attrs({ type: "text" })`
  width: 576px;
  height: 42px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 12px;
`;

//ToDo: 커스텀 캘린더 아이콘 추가
const DueDateInput = styled.input.attrs({ type: "date" })`
  width: 272px;
  height: 42px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 286px;
  padding-left: 15px;
`;

const SaveButton = styled.button`
  width: 106px;
  height: 51px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background-color: #15521d;
  border-radius: 5px;
  text-align: center;
  align-self: flex-end;
  cursor: pointer;
`;

export default LectureTaskAddModal;
