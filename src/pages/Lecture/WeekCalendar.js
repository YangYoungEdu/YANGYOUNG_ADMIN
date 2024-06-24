import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WeekCalendar = ({ currentDate, lectures }) => {
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const [filteredLectures, setFilteredLectures] = useState({});

  useEffect(() => {
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

  const getHour = (hour) => {
    if (hour < 7) return `오전 ${hour + 12}:00`;
    if (hour < 12) return `오전 ${hour}:00`;
    if (hour === 12) return `오후 ${hour}:00`;
    return `오후 ${hour - 12}:00`;
  };

  const getDayDate = (currentDate, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + index);
    return date.getDate().toString().padStart(2, "0");
  };

  const renderLecturesByQuarterHour = (dayOfWeek, hour, quarter) => {
    if (filteredLectures[dayOfWeek])  {
      // 시간순으로 강의 정렬
      const sortedLectures = filteredLectures[dayOfWeek].sort((a, b) => {
        const startTimeA = a.startTime;
        const startTimeB = b.startTime;
        return startTimeA - startTimeB;
      });
      console.log("sortedLectures: ", sortedLectures);

      return sortedLectures.map((lecture, index) => {
        const startTime = lecture.startTime;
        const startHour = startTime.split(":")[0];
        const startMinute = startTime.split(":")[1];
        const startQuarter = Math.floor(startTime.split(":")[1] / 15);
        const endTime = lecture.endTime;
        const endHour = endTime.split(":")[0];
        const endMinute = endTime.split(":")[1];
        const endQuarter = Math.ceil(endTime.split(":")[1] / 15);

        if (
          startHour === hour &&
          startQuarter <= quarter &&
          (endHour > hour ||
            (endHour === hour && endQuarter > quarter))
        ) {
          return (
            <QuarterHourCell key={index} hasLecture={true}>
              {lecture.name}
            </QuarterHourCell>
          );
        }

        if (startHour < hour && endHour > hour) {
          return (
            <QuarterHourCell key={index} hasLecture={true}>
              {lecture.name}
            </QuarterHourCell>
          );
        }

        if (endHour === hour && endQuarter > quarter) {
          return (
            <QuarterHourCell key={index} hasLecture={true}>
              {lecture.name}
            </QuarterHourCell>
          );
        }

        return null;
      });
    }
    return null;
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
              {[...Array(4).keys()].map((quarter) => (
                <QuarterHourCell key={quarter}>
                  {renderLecturesByQuarterHour(
                    daysOfWeek[index],
                    hour + 7,
                    quarter
                  )}
                </QuarterHourCell>
              ))}
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
