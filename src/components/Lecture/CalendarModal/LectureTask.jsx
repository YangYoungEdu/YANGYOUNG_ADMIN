import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColumnDiv } from "../../../style/CommonStyle";
import { ReactComponent as Plus } from "../../../Assets/Plus.svg";
import { ReactComponent as Delete } from "../../../Assets/Delete.svg";
import { getLectureTaskAPI, deleteTaskAPI } from "../../../API/TaskAPI";
import LectureTaskAddModal from "./LectureTaskAddModal";

const LectureTask = ({id}) => {
  const [tasks, setTasks] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getLectureTaskAPI(id).then((res) => {
      setTasks(res);
    });
  }, [id, isUploaded, isDeleted]);

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const convertDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}월 ${day}일`;
  };

  return (
    <TaskWrapper>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task, index) => (
          <TaskBox key={index}>
            <TaskContentWrapper>
              <TaskTitleWrapper>
                <TaskTitle>{task.content}</TaskTitle>
                <TaskType>{task.taskType}</TaskType>
              </TaskTitleWrapper>
              <TaskDate>마감일: {convertDate(task.taskDate)}</TaskDate>
            </TaskContentWrapper>
            <DeleteIcon onClick={() => deleteTask(task.id)} />
          </TaskBox>
        ))}
      <TaskBox>
        <TaskPlusIcon onClick={() => setIsModalOpen(true)} />
      </TaskBox>

      {isModalOpen && (
        <LectureTaskAddModal
          setIsUploaded={setIsUploaded}
          setIsModalOpen={setIsModalOpen}
          id={id}
        />
      )}
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const TaskContentWrapper = styled(ColumnDiv)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlusIcon = styled(Plus)`
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TaskPlusIcon = styled(PlusIcon)``;

const TaskTitleWrapper = styled.div`
  display: flex;
  gap: 9px;
`;

const TaskTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
`;

const TaskType = styled.div`
  display: flex;
  width: 57px;
  height: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
  align-items: center;
  justify-content: center;
`;

const TaskDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const DeleteIcon = styled(Delete)`
  cursor: pointer;
`;

export default LectureTask;
