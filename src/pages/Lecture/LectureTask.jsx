import styled from "styled-components";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";

const LectureTask = ({ tasks }) => {
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
            <TaskTitleWrapper>
              <TaskTitle>{task.content}</TaskTitle>
              <TaskType>{task.taskType}</TaskType>
            </TaskTitleWrapper>
            <TaskDate>마감일: {convertDate(task.taskDate)}</TaskDate>
          </TaskBox>
        ))}
      <TaskBox>
        <TaskPlusIcon />
      </TaskBox>
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  width: 100%;
  padding-left: 9.5%;
`;

const TaskBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 86px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 2.5px 0px;
  padding: 18.5px 0 0 23px;
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

export default LectureTask;
