import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RowDiv, ColumnDiv } from "../../../style/CommonStyle";
import { ReactComponent as XIcon } from "../../../Assets/XIcon.svg";
import ClockIcon from "../../../Assets/Clock.svg";
import { addTaskAPI } from "../../../API/TaskAPI";

const TaskAddModal = ({ setIsModalOpen, studentLecture }) => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState({
    studentId: parseInt(id),
    content: "",
    lectureId: "",
    taskType: "",
    taskDate: "",
  });

  const postTask = async () => {
    if (
      newTask.content === "" ||
      newTask.taskType === "" ||
      newTask.taskDate === ""
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    addTaskAPI(newTask).then(() => {
      setIsModalOpen(false);
    });
  };

  const handleChangeInput = (e, type) => {
    switch (type) {
      case "content":
        setNewTask({ ...newTask, content: e.target.value });
        break;
      case "lectureId":
        setNewTask({ ...newTask, lectureId: e.target.value });
        break;
      case "taskDate":
        setNewTask({ ...newTask, taskDate: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (type) => {
    setNewTask({ ...newTask, taskType: type });
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

        <RowWrapper>
          <ColumnDiv>
            <SubTitle2>수업</SubTitle2>
            <LectureSelect>
              {studentLecture &&
                studentLecture.map((lecture) => (
                  <option key={lecture.id} value={lecture.id}>
                    {lecture.name}
                  </option>
                ))}
            </LectureSelect>
          </ColumnDiv>
          <ColumnDiv>
            <SubTitle2>과제 종류</SubTitle2>
            <TypeButtonWrapper>
              <TypeButton
                onClick={() => {
                  handleButtonClick("개인과제");
                }}
              >
                개인과제
              </TypeButton>
              <TypeButton
                onClick={() => {
                  handleButtonClick("전체과제");
                }}
              >
                전체과제
              </TypeButton>
            </TypeButtonWrapper>
          </ColumnDiv>
        </RowWrapper>

        <ColumnDiv>
          <SubTitle2>마감일</SubTitle2>
          <DueDateInput
            type="date"
            onChange={(e) => handleChangeInput(e, "taskDate")}
          />
        </ColumnDiv>

        <SaveButton onClick={() => postTask()}>저장</SaveButton>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
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
  width: 885px;
  height: 757px;
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

const RowWrapper = styled(RowDiv)`
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

const LectureSelect = styled.select`
  width: 272px;
  height: 42px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const TypeButtonWrapper = styled(RowDiv)`
  justify-content: flex-start;
`;

const TypeButton = styled.button`
  width: 77px;
  height: 42px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-right: 8px;
  margin-left: -3px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;

  &:focus {
    background-color: #e9f2eb;
    color: #15521d;
  }
`;

//ToDo: 커스텀 캘린더 아이콘 추가
const DueDateInput = styled.input.attrs({ type: "date" })`
  width: 272px;
  height: 42px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 286px;
  padding-left: 15px;

  /* background: url(${ClockIcon}) no-repeat right 20px center; 
  appearance: none;  
  -webkit-appearance: none;  
  -moz-appearance: none;
  position: relative;
  z-index: 1;  */
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
  margin-left: 650px;
  cursor: pointer;
`;

export default TaskAddModal;
