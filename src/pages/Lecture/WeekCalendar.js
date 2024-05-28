import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WeekCalendar = ({ currentDate, lectures }) => {
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const [filteredLectures, setFilteredLectures] = useState({});

  useEffect(() => {
    // 날짜별로 강의 필터링
    const filterLecturesByDateAndTime = () => {
      const filtered = {};
      const getDayOfWeek = (date) => {
        const dayOfWeek = new Date(date).getDay();
        return ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
      };

      const getLecturesByDate = (lectures, date) => {
        return lectures.filter((lecture) => lecture.dateList.includes(date));
      };

      for (let i = 0; i <= 6; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        const dayOfWeek = getDayOfWeek(date);
        filtered[dayOfWeek] = getLecturesByDate(
          lectures,
          date.toISOString().slice(0, 10)
        );
      }

      return filtered;
    };

    setFilteredLectures(filterLecturesByDateAndTime(lectures, currentDate));
  }, [currentDate, lectures]);

  // 시간 표시 함수(오전/오후)
  const getHour = (hour) => {
    if (hour < 7) return `오전 ${hour + 12}:00`;
    if (hour < 12) return `오전 ${hour}:00`;
    if (hour === 12) return `오후 ${hour}:00`;
    return `오후 ${hour - 12}:00`;
  };

  // 요일별 날짜 표시 함수
  const getDayDate = (currentDate, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + index);
    return date.getDate().toString().padStart(2, "0");
  };

  const renderLecturesByHour = (dayOfWeek, hour) => {
    if (filteredLectures[dayOfWeek]) {
      return filteredLectures[dayOfWeek].map((lecture, index) => (
        <HourCell key={index} hasLecture={true}>
          {lecture.name}
        </HourCell>
      ));
    }
    return null;
  };

  return (
    <CalendarContainer>
      {/* 요일, 날짜 표시 */}
      <WeekRow>
        <EmptyCell></EmptyCell>
        {daysOfWeek.map((day, index) => (
          <DayCell key={index}>
            <DayText>{day}</DayText>
            <DateText>{getDayDate(currentDate, index)}</DateText>
          </DayCell>
        ))}
      </WeekRow>

      {/* 시간대별 강의 표시 */}
      {[...Array(17).keys()].map((hour, index) => (
        <WeekRow key={hour}>
          <HourText>{getHour(hour + 7)}</HourText>
          {daysOfWeek.map((day, index) => (
            <HourCell key={index}>
              {renderLecturesByHour(daysOfWeek[index], hour)}
            </HourCell>
          ))}
        </WeekRow>
      ))}
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const DayText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
`;

const DateText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
`;

const EmptyCell = styled.div`
  width: 14%;
  height: 50px;
`;

const DayCell = styled.div`
  width: calc(100% / 7);
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HourCell = styled.div`
  flex: 1;
  height: 50px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.hasLecture ? "skyblue" : "transparent"};
`;

const HourText = styled(HourCell)`
  font-size: ${(props) => props.theme.fontSizes.bodyText5};
  border: none;
  align-items: flex-start;
  margin-top: -7px;
`;

export default WeekCalendar;
