import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WeekCalendar = ({ currentDate, lectures }) => {
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [filteredLectures, setFilteredLectures] = useState({});
  const weeklyCalendar = new Array(7)
    .fill()
    .map(() => new Array(24).fill().map(() => new Array(12).fill([])));

  useEffect(() => {
    setFilteredLectures(filterLecturesByDate(lectures, currentDate));
    renderLecturesByQuarterHour();

    setTimeout(() => {
      console.log(weeklyCalendar);
    }, 1000);
  }, [lectures, currentDate]);

  // 강의 목록을 날짜별로 필터링
  const filterLecturesByDate = (lectures, currentDate) => {
    const filtered = {};
    const startDate = getStartOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dayOfWeek = getDayOfWeek(date);
      filtered[dayOfWeek] = getLecturesByDate(
        lectures,
        date.toISOString().slice(0, 10)
      );
    }

    return filtered;
  };

  // 주의 시작 날짜를 반환
  const getStartOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day;
    return new Date(currentDate.setDate(diff));
  };

  // 날짜를 기준으로 요일 반환
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
  };

  // 날짜를 기준으로 해당 날짜의 강의 목록을 반환
  const getLecturesByDate = (lectures, date) => {
    return lectures
      .filter((lecture) => lecture.dateList.includes(date))
      .sort((a, b) => a.startTime - b.startTime);
  };

  // 시간을 받아서 오전/오후 시간을 반환하는 함수
  const getHour = (hour) => {
    if (hour < 7) return `오전 ${hour + 12}:00`;
    if (hour < 12) return `오전 ${hour}:00`;
    if (hour === 12) return `오후 ${hour}:00`;
    return `오후 ${hour - 12}:00`;
  };

  // 현재 날짜에서 index만큼 더한 날짜의 일자를 반환하는 함수
  const getDayDate = (currentDate, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + index);
    return date.getDate().toString().padStart(2, "0");
  };

  const renderLecturesByQuarterHour = () => {
    dayOfWeek.forEach((day, dayIndex) => {
      const sortedLectures = filteredLectures[day];
      if (sortedLectures && sortedLectures.length > 0) {
        sortedLectures.forEach((lecture) => {
          const [startHour, startMinute] = lecture.startTime.split(":").map(Number);
          const [endHour, endMinute] = lecture.endTime.split(":").map(Number);
          const startMinuteIndex = Math.floor(startMinute / 5);
          const endMinuteIndex = Math.floor(endMinute / 5);

          for (let hour = startHour; hour <= endHour; hour++) {
            let minuteStart = 0,
              minuteEnd = 11;

            if (hour === startHour) minuteStart = startMinuteIndex;
            if (hour === endHour) minuteEnd = endMinuteIndex;

            for (let minute = minuteStart; minute <= minuteEnd; minute++) {
              weeklyCalendar[dayIndex][hour][minute].push(lecture);
            }
          }
        });
      }
    });
  };

  return (
    <CalendarContainer>
      <WeekRow>
        <EmptyCell></EmptyCell>
        {daysOfWeek.map((day, index) => (
          <DayCell key={index}>
            <DayText>{day}</DayText>
            <DateText>{getDayDate(currentDate, index)}</DateText>
          </DayCell>
        ))}
      </WeekRow>

      {[...Array(17).keys()].map((hour) => (
        <WeekRow key={hour}>
          <HourText>{getHour(hour + 7)}</HourText>
          {daysOfWeek.map((day, index) => (
            <HourCell key={index}>
              {/* {[...Array(4).keys()].map((quarter) => (
                <QuarterHourCell key={quarter}>
                  {renderLecturesByQuarterHour(
                    daysOfWeek[index],
                    hour + 7,
                    quarter
                  )}
                </QuarterHourCell>
              ))} */}
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

const QuarterHourCell = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  background-color: ${({ hasLecture }) => (hasLecture ? "#e3f2fd" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default WeekCalendar;
