import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as UnOpenBlackPolygon } from "../../../Assets/UnOpenBlackPolygon.svg";
import { ReactComponent as BlackPolygon } from "../../../Assets/BlackPolygon.svg";
import { ReactComponent as Plus } from "../../../Assets/PlusIcon.svg";
import {
  getOneStudentTaskAPI,
  patchTaskProgressAPI,
} from "../../../API/TaskAPI";
import TaskAddModal from "../StudentModal/TaskAddModal";

const PersonalTask = ({ studentTask, studentLecture }) => {
  const { id } = useParams();

  const [isIngOpen, setIsIngOpen] = useState(true);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const getOneStudentTask = async () => {
      try {
        const response = await getOneStudentTaskAPI(id);

        const inProgress = response.filter(
          (task) => task.taskProgress === "제출 전"
        );
        const completed = response.filter(
          (task) => task.taskProgress === "제출 완료"
        );

        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getOneStudentTask();
  }, [id]);

  const updateTaskProgress = async (taskId, newProgress) => {
    try {
      await patchTaskProgressAPI(id, taskId, newProgress);
      // 상태 업데이트 후 다시 데이터를 가져옵니다
      const response = await getOneStudentTaskAPI(id);
      const inProgress = response.filter(
        (task) => task.taskProgress === "제출 전"
      );
      const completed = response.filter(
        (task) => task.taskProgress === "제출 완료"
      );
      setInProgressTasks(inProgress);
      setCompletedTasks(completed);
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };

  return (
    <TopDiv>
      {/* 진행 중 과제 */}
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsIngOpen(!isIngOpen)}>
            {isIngOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>진행 중인 과제</PolygonText>
          </div>
          <PlusIcon onClick={() => setIsModalOpen(true)} />
        </BtnArea>
        {/* 진행 중 과제 목록 */}
        {isIngOpen && (
          <TaskDiv>
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <Box key={task.id}>
                  <TopInfo>
                    <Title>{task.content}</Title>
                    {task.taskType !== "개인 과제" && (
                      <DetailBox background={"#E9F2EB"}>
                        {task.lectureName}
                      </DetailBox>
                    )}
                    <DetailBox background={"#FFF4DE"}>
                      {task.taskType}
                    </DetailBox>
                  </TopInfo>
                  <BottomInfo>
                    <div>{task.taskDate}</div>
                    <div>|</div>
                    <div>{task.taskProgress}</div>
                    <Button
                      onClick={() => updateTaskProgress(task.id, "제출 완료")}
                    >
                      마감으로 변경
                    </Button>
                  </BottomInfo>
                </Box>
              ))
            ) : (
              <></>
            )}
          </TaskDiv>
        )}
      </BigDiv>

      <StyledHr />

      {/* 완료된 과제 */}
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsEndOpen(!isEndOpen)}>
            {isEndOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>제출된 과제</PolygonText>
          </div>
        </BtnArea>
        {/* 완료된 과제 목록 */}
        {isEndOpen && (
          <TaskDiv>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <Box key={task.id}>
                  <TopInfo>
                    <Title>{task.content || ""}</Title>
                    <DetailBox background={"#E9F2EB"}>
                      {task.lectureName || ""}
                    </DetailBox>
                    <DetailBox background={"#FFF4DE"}>
                      {task.taskType || ""}
                    </DetailBox>
                  </TopInfo>
                  <BottomInfo>
                    <div>{task.taskDate || ""}</div>
                    <div>|</div>
                    <div>{task.taskProgress || ""}</div>
                    <Button
                      onClick={() => updateTaskProgress(task.id, "제출 전")}
                    >
                      진행 중으로 변경
                    </Button>
                  </BottomInfo>
                </Box>
              ))
            ) : (
              <></>
            )}
          </TaskDiv>
        )}
      </BigDiv>

      {isModalOpen && (
        <TaskAddModal
          setIsModalOpen={setIsModalOpen}
          studentLecture={studentLecture}
        />
      )}
    </TopDiv>
  );
};

const TopDiv = styled.div`
  box-sizing: border-box;
  margin-left: 50px;
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;
const BigDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const BtnArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 13px;
  :first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  align-items: center;
  justify-content: space-between;
`;
const PolygonText = styled.div`
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 600;
`;

const TaskDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  cursor: default;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 807px;
  height: 84px;
  padding-top: 21px;
  padding-left: 23px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  gap: 9.5px;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  align-items: center;
`;

const BottomInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Pretendard Variable;
  font-size: 12px;
  font-weight: 400;
  gap: 6px;
`;
const Title = styled.div`
  font-family: Pretendard Variable;
  font-size: 16px;
  font-weight: 700;
`;

const DetailBox = styled.div`
  box-sizing: border-box;
  text-align: center;
  line-height: 17px;
  padding: 3px 8px 3px 8px;
  min-width: 57px;
  height: 20px;
  border-radius: 3px;
  background: ${({ background }) => background};
  font-family: Pretendard Variable;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
`;

const StyledHr = styled.hr`
  border: 0;
  width: 801px;
  height: 1px;
  background: #efefef;
`;

const PlusIcon = styled(Plus)`
  cursor: pointer;
`;

const Button = styled.button`
  background-color: aliceblue;
  padding: 2px 5px;
  box-sizing: border-box;
  cursor: pointer;
`;
export default PersonalTask;
export {
  TopDiv,
  BigDiv,
  BtnArea,
  PolygonText,
  Box,
  TopInfo,
  BottomInfo,
  Title,
  DetailBox,
  StyledHr,
};
