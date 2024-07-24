import styled from "styled-components";
import { ReactComponent as Rect } from "../../Assets/Rect.svg";

const LectureList = ({ lectures, selectedLecture, onLectureSelect }) => (
  <LecturesWrapper>
    {lectures.length > 0 ? (
      lectures.map(([timeSlot, lecturesForTimeSlot]) => (
        <LectureSlot key={timeSlot}>
          <TimeSlotArea>
            <Rect />
            <TimeSlot>{timeSlot}</TimeSlot>
          </TimeSlotArea>
          {lecturesForTimeSlot.map((lecture) => (
            <LectureName
              key={lecture.id}
              isActive={selectedLecture === lecture.id}
              onClick={() => onLectureSelect(lecture.id)}
            >
              {lecture.name}
            </LectureName>
          ))}
        </LectureSlot>
      ))
    ) : (
      <div>수업 정보가 없습니다.</div>
    )}
  </LecturesWrapper>
);

const LecturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 364px;
  overflow-y: scroll;
`;

const LectureSlot = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 39px;
`;

const TimeSlotArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const TimeSlot = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #15521d;
  margin-bottom: 14px;
`;

const LectureName = styled.div`
  width: 95%;
  height: 39px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 10px 10px 15px;
  background-color: ${({ isActive }) => (isActive ? "#15521D" : "#f7f7f7")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default LectureList;

