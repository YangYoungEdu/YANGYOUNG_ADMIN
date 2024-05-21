import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";

const Calendar = ({ currentDate, lectures }) => {
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [days, setDays] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);

  useEffect(() => {
    renderCalendar();
    fileterLectureByDay();
  }, [currentDate, lectures]);

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startDay = startOfMonth(currentDate);
    const totalCells = 35;

    let dayCounter = 1;

    for (let i = 0; i < totalCells; i++) {
      if (i >= startDay && dayCounter <= totalDays) {
        days.push(dayCounter);
        dayCounter++;
      } else {
        days.push("");
      }
    }

    setDays(days);
  };

  const fileterLectureByDay = () => {
    // yyyy-mm-dd 형식의 날짜에서 dd만 추출해서 날짜별로 강의 분류
    let filteredLectures = [];
    lectures.forEach((lecture) => {
      const dateList = lecture.dateList;
      dateList.forEach((date) => {
        const day = date.split("-")[2];
        if (filteredLectures[day] === undefined) {
          filteredLectures[day] = [];
        }
        filteredLectures[day].push(lecture);
      });
    });

    console.log(filteredLectures);
    setFilteredLectures(filteredLectures);
  };

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <MainDiv>
      <CalendarBody>
        {days.map((day, index) => {
          if (filteredLectures[day] !== undefined) {
            return (
              <DayCell key={index}>
                {day}
                {filteredLectures[day].map((lecture, index) => {
                  return <div key={index}>{lecture.name}</div>;
                })}
              </DayCell>
            );
          } else {
            return <DayCell key={index}>{day}</DayCell>;
          }
        })}
      </CalendarBody>
    </MainDiv>
  );
};

const CalendarBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1120px;
  height: 720px;
`;

const DayCell = styled.div`
  width: calc(100% / 8);
  height: calc(100% / 5);
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Calendar;
