import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";

const MonthCalendar = ({ currentDate, lectures }) => {
  const [days, setDays] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

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

    // 이전 달의 마지막 몇 일을 추가
    const prevMonthDays = startDay;
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0
    );
    const prevMonthTotalDays = prevMonth.getDate();
    for (
      let i = prevMonthTotalDays - prevMonthDays + 1;
      i <= prevMonthTotalDays;
      i++
    ) {
      days.push(i.toString());
    }

    // 이번 달의 날짜를 추가
    for (let i = 1; i <= totalDays; i++) {
      days.push(i.toString());
      dayCounter++;
    }

    // 다음 달의 첫 몇 일을 추가
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(i.toString());
    }

    setDays(days);
  };

  // yyyy-mm-dd 형식의 날짜에서 dd만 추출해서 날짜별로 강의 분류
  const fileterLectureByDay = () => {
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

    setFilteredLectures(filteredLectures);
  };

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <MonthCalendarWrapper>
      <CalendarBody>
        {days.map((day, index) => {
          const isFirstWeek = index < 7;
          const hasLectures = filteredLectures[day] !== undefined;

          return (
            <DayCell key={index}>
              <DayText>
                {isFirstWeek && (
                  <>
                    {weekDays[index]}
                    <br />
                  </>
                )}
                {day}
              </DayText>
              <br />
              {hasLectures &&
                filteredLectures[day].map((lecture, lectureIndex) => (
                  <LectureCell
                    key={lectureIndex}
                    backgroundColor={lecture.backgroundColor}
                  >
                    {lecture.name}
                  </LectureCell>
                ))}
            </DayCell>
          );
        })}
      </CalendarBody>
    </MonthCalendarWrapper>
  );
};

const MonthCalendarWrapper = styled(MainDiv)`
  width: 90%;
  align-items: flex-start;
`;

const CalendarBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const DayCell = styled.div`
  width: calc(100% / 7);
  height: 0;
  padding-bottom: calc(100% / 7);
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
`;

const DayText = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
`;

const LectureCell = styled.div`
  width: 95%;
  border-radius: 5px;
`;

export default MonthCalendar;
