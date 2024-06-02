import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
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
    <ThemeProvider theme={theme}>
      <MonthCalendarWrapper>
        <CalendarBody>
          {days.map((day, index) => {
            const isFirstWeek = index < 7;
            const lectureNum =
              filteredLectures[day] && filteredLectures[day].length;
            // const hasLectures = filteredLectures[day] !== undefined;

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
                {lectureNum > 0 &&
                  filteredLectures[day]
                    .slice(0, 3)
                    .map((lecture, lectureIndex) => (
                      <React.Fragment key={lectureIndex}>
                        <LectureCell teacher={lecture.teacher}>
                          {lecture.name}
                        </LectureCell>
                        {lectureNum > 3 && lectureIndex === 2 && (
                          <LectureText>
                            그 외 {lectureNum - 3}개 수업이 더 있습니다.
                          </LectureText>
                        )}
                      </React.Fragment>
                    ))}
                {/* {lectureNum > 0 &&
                  filteredLectures[day].map((lecture, lectureIndex) =>
                    lectureNum > 3 ? (
                      <LectureCell key={lectureIndex} teacher={lecture.teacher}>
                        {lecture.teacher}
                      </LectureCell>
                    ) : (
                      <LectureCell key={lectureIndex} teacher={lecture.teacher}>
                        {lecture.teacher}
                        하이
                      </LectureCell>
                    )
                  )} */}
              </DayCell>
            );
          })}
        </CalendarBody>
      </MonthCalendarWrapper>
    </ThemeProvider>
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
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  box-sizing: border-box;
  position: relative;
`;

const DayText = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 0.9em;
  font-weight: bold;
  position: absolute;
  top: 5px;
`;

const LectureCell = styled.div`
  width: 90%;
  border-radius: 5px;
  margin-top: 40px;
  margin-bottom: -30px;
  padding: 5px;
  font-size: 0.8em;
  text-align: center;

  background-color: ${({ teacher, theme }) => {
    switch (teacher) {
      case "선생님1":
        return `${theme.colors.prof_kim}70`;
      case "선생님2":
        return `${theme.colors.prof_hong}70`;
      case "선생님3":
        return `${theme.colors.prof_lee}70`;
      default:
        return "rgba(135, 206, 235, 0.7)";
    }
  }};
`;

const LectureText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  padding-top: 40px;
`;
export default MonthCalendar;
