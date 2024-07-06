import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as UnOpenBlackPolygon } from "../../../Assets/UnOpenBlackPolygon.svg";
import { ReactComponent as BlackPolygon } from "../../../Assets/BlackPolygon.svg";
import { ReactComponent as PlusIcon } from "../../../Assets/PlusIcon.svg";
import {
  getOneStudentTaskAPI,
  postOneStudentTaskAPI,
} from "../../../API/TaskAPI";

const PersonalTask = () => {
  const { id } = useParams();

  const [isIngOpen, setIsIngOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
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

  return (
    <TopDiv>
      {/* 과제 현황 */}
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsIngOpen(!isIngOpen)}>
            {isIngOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>진행 중</PolygonText>
          </div>
          <PlusIcon />
        </BtnArea>
        {/* task 목록 */}
        {isIngOpen && (
          <TaskDiv>
            {inProgressTasks.map((task) => (
              <Box key={task.id}>
                <TopInfo>
                  <Title>{task.content}</Title>
                  <DetailBox background={"#E9F2EB"}>
                    {task.lectureName}
                  </DetailBox>
                  <DetailBox background={"#FFF4DE"}>{task.taskType}</DetailBox>
                </TopInfo>
                <BottomInfo>
                  <div>{task.taskDate}</div>
                  <div>|</div>
                  <div>{task.taskProgress}</div>
                </BottomInfo>
              </Box>
            ))}
          </TaskDiv>
        )}
      </BigDiv>

      <StyledHr />

      {/* 마감된 과제 */}
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsEndOpen(!isEndOpen)}>
            {isEndOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>마감</PolygonText>
          </div>
          <PlusIcon />
        </BtnArea>
        {/* task 목록 */}
        {isEndOpen && (
          <div>
            {completedTasks.map((task) => (
              <Box key={task.id}>
                <TopInfo>
                  <Title>{task.content}</Title>
                  <DetailBox background={"#E9F2EB"}>
                    {task.lectureName}
                  </DetailBox>
                  <DetailBox background={"#FFF4DE"}>{task.taskType}</DetailBox>
                </TopInfo>
                <BottomInfo>
                  <div>{task.taskDate}</div>
                  <div>|</div>
                  <div>{task.taskProgress}</div>
                </BottomInfo>
              </Box>
            ))}
          </div>
        )}
      </BigDiv>
    </TopDiv>
  );
};

const TopDiv = styled.div`
  box-sizing: border-box;
  margin-left: 50px;
  margin-top: 50px;
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
