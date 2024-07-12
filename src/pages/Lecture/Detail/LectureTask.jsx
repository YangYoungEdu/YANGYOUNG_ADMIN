import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColumnDiv } from "../../../style/CommonStyle";
import { ReactComponent as Plus } from "../../../Assets/Plus.svg";
import { ReactComponent as Delete } from "../../../Assets/Delete.svg";
import { getLectureTaskAPI, deleteTaskAPI } from "../../../API/TaskAPI";
import LectureTaskAddModal from "./LectureTaskAddModal";

const LectureTask = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getLectureTaskAPI(id).then((res) => {
      setTasks(res);
    });
  }, [isUploaded, isDeleted]);

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
  width: 100%;
  padding-left: 9.5%;
  overflow: auto;
`;

const TaskBox = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 90%;
  height: 86px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 2.5px 0px;
  padding: 18.5px 0 0 23px;
  box-sizing: border-box;
`;

const TaskContentWrapper = styled(ColumnDiv)`
  width: 80%;
  margin-top: -20px;
  margin-left: 15px;
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
  margin: 20px 0px 0px -10px;
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

const TaskType = styled.div`
  width: 57px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
  text-align: center;
`;

const TaskDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const DeleteIcon = styled(Delete)`
  cursor: pointer;
  padding-top: 13px;
  padding-left: 70px;
`;

export default LectureTask;
