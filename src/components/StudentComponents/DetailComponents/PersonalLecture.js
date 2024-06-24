import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
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
} from "./PersonalTask";
import { ReactComponent as UnOpenBlackPolygon } from "../../../Assets/UnOpenBlackPolygon.svg";
import { ReactComponent as BlackPolygon } from "../../../Assets/BlackPolygon.svg";
import { ReactComponent as PlusIcon } from "../../../Assets/PlusIcon.svg";
import { getOneStudentLectureAPI } from "../../../API/LectureAPI";

const PersonalLecture = () => {
  const [isIngOpen, setIsIngOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [inProgressLectures, setInProgressLectures] = useState([]);
  const [completedLectures, setCompletedLectures] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getOneStudentLecture = async (id) => {
      try {
        const response = await getOneStudentLectureAPI(id);
        const inProgress = response.filter(
          (lecture) => lecture.finished === false
        );
        const completed = response.filter(
          (lecture) => lecture.finished === true
        );
        setInProgressLectures(inProgress);
        setCompletedLectures(completed);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getOneStudentLecture(id);
  }, [id]);

  const formatTime = (time) => {
    // time이 "hh:mm:ss" 형식일 때 앞에서 두 개의 항목만 가져옴
    return time.slice(0, 5);
  };

  return (
    <TopDiv>
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsIngOpen(!isIngOpen)}>
            {isIngOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>진행 중인 수업</PolygonText>
          </div>
          <PlusIcon />
        </BtnArea>
        {isIngOpen && (
          <div>
            {inProgressLectures.map((lecture) => (
              <Box key={lecture.id}>
                <TopInfo>
                  <Title>{lecture.name}</Title>
                  <DetailBox background={"#E9F2EB"}>
                    {lecture.teacher}
                  </DetailBox>
                </TopInfo>
                <BottomInfo>
                  <div>
                    {lecture.dateList.length !== 0
                      ? lecture.dateList.join(", ")
                      : lecture.dayList.join(", ")}
                  </div>
                  <div>|</div>
                  <div>
                    {formatTime(lecture.startTime)}-
                    {formatTime(lecture.endTime)}
                  </div>
                  <div>|</div>
                  <div>{lecture.room}</div>
                </BottomInfo>
              </Box>
            ))}
          </div>
        )}
      </BigDiv>
      <StyledHr />
      <BtnArea>
        <div onClick={() => setIsEndOpen(!isEndOpen)}>
          {isEndOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
          <PolygonText>지난 수업</PolygonText>
        </div>
        <PlusIcon />
      </BtnArea>
      {isEndOpen && (
        <div>
          {completedLectures.map((lecture) => (
            <Box key={lecture.id}>
              <TopInfo>
                <Title>{lecture.name}</Title>
                <DetailBox background={"#E9F2EB"}>
                  {lecture.teacher}
                </DetailBox>
              </TopInfo>
              <BottomInfo>
                  <div>
                    {lecture.dateList.length !== 0
                      ? lecture.dateList.join(", ")
                      : lecture.dayList.join(", ")}
                  </div>
                  <div>|</div>
                  <div>
                    {formatTime(lecture.startTime)}-
                    {formatTime(lecture.endTime)}
                  </div>
                  <div>|</div>
                  <div>{lecture.room}</div>
                </BottomInfo>
            </Box>
          ))}
        </div>
      )}
    </TopDiv>
  );
};

export default PersonalLecture;
