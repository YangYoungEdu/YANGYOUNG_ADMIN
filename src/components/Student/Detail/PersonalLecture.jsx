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
import { getLectureByStudentAPI } from "../../../API/LectureAPI";

const PersonalLecture = () => {
  const [isIngOpen, setIsIngOpen] = useState(true);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [inProgressLectures, setInProgressLectures] = useState([]);
  const [completedLectures, setCompletedLectures] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const getOneStudentLecture = async (id) => {
      try {
        const response = await getLectureByStudentAPI(id);
        console.log(response); // Check the returned data

        const currentDate = new Date(); // Get current date
        const inProgress = response.filter((lecture) => {
          const lectureDate = new Date(lecture.lectureDate);
          return !lecture.finished && lectureDate >= currentDate;
        });
        const completed = response.filter((lecture) => {
          const lectureDate = new Date(lecture.lectureDate);
          return lecture.finished || lectureDate < currentDate;
        });

        setInProgressLectures(inProgress);
        setCompletedLectures(completed);
      } catch (error) {
        console.error(error);
      }
    };
    getOneStudentLecture(id);
  }, [id]);

  const formatTime = (timeObj) => {
    if (!timeObj || typeof timeObj.hour !== "number" || typeof timeObj.minute !== "number") {
      console.error("Invalid time object", timeObj);
      return "00:00"; // Default value
    }

    // Format hours and minutes to two digits
    const hours = timeObj.hour.toString().padStart(2, "0");
    const minutes = timeObj.minute.toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";

    // Format date from "YYYY-MM-DD" to "YYYY년 MM월 DD일"
    const [year, month, day] = dateStr.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <TopDiv>
      <BigDiv>
        <BtnArea>
          <div onClick={() => setIsIngOpen(!isIngOpen)}>
            {isIngOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
            <PolygonText>진행 중인 수업</PolygonText>
          </div>
          {/* <PlusIcon /> */}
        </BtnArea>
        {isIngOpen && (
          <div>
            {inProgressLectures.length > 0 ? (
              inProgressLectures.map((lecture) => (
                <Box key={lecture.id}>
                  <TopInfo>
                    <Title>{lecture.name || "No Title"}</Title>
                    <DetailBox background={"#E9F2EB"}>
                      {lecture.teacher || "Unknown Teacher"}
                    </DetailBox>
                  </TopInfo>
                  <BottomInfo>
                    <div>
                      {lecture.lectureDate
                        ? formatDate(lecture.lectureDate)
                        : lecture.lectureDay || "No date information"}
                    </div>
                    <div>|</div>
                    <div>
                      {formatTime(lecture.startTime)}-{formatTime(lecture.endTime)}
                    </div>
                    <div>|</div>
                    <div>{lecture.room || "No Room Info"}</div>
                  </BottomInfo>
                </Box>
              ))
            ) : (
              <Box>No ongoing lectures</Box>
            )}
          </div>
        )}
      </BigDiv>
      <StyledHr />
      <BtnArea>
        <div onClick={() => setIsEndOpen(!isEndOpen)}>
          {isEndOpen ? <BlackPolygon /> : <UnOpenBlackPolygon />}
          <PolygonText>지난 수업</PolygonText>
        </div>
        {/* <PlusIcon /> */}
      </BtnArea>
      {isEndOpen && (
        <div>
          {completedLectures.length > 0 ? (
            completedLectures.map((lecture) => (
              <Box key={lecture.id}>
                <TopInfo>
                  <Title>{lecture.name || "No Title"}</Title>
                  <DetailBox background={"#E9F2EB"}>
                    {lecture.teacher || "Unknown Teacher"}
                  </DetailBox>
                </TopInfo>
                <BottomInfo>
                  <div>
                    {lecture.lectureDate
                      ? formatDate(lecture.lectureDate)
                      : lecture.lectureDay || "No date information"}
                  </div>
                  <div>|</div>
                  <div>
                    {formatTime(lecture.startTime)}-{formatTime(lecture.endTime)}
                  </div>
                  <div>|</div>
                  <div>{lecture.room || "No Room Info"}</div>
                </BottomInfo>
              </Box>
            ))
          ) : (
            <Box>No completed lectures</Box>
          )}
        </div>
      )}
    </TopDiv>
  );
};

export default PersonalLecture;
