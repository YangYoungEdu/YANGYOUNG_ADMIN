import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import { MainDiv, RowDiv } from "../../style/CommonStyle";

const MonthCalendar = ({
  currentDate,
  lectures,
  isHighlight,
  setIsHighlight,
}) => {
  const [days, setDays] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const teacherList = [
    { name: "김삼유", color: "#95C25C" },
    { name: "홍길동", color: "#FFC14B" },
    { name: "김수지", color: "#A6773F" },
  ];

  useEffect(() => {
    renderCalendar();
    filterLecturesByDay();
  }, [currentDate, lectures]);

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startDay = startOfMonth(currentDate);
    const totalCells = 42;

    // 이전 달의 마지막 몇 일을 추가
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const prevMonthTotalDays = prevMonth.getDate();
    for (
      let i = prevMonthTotalDays - startDay + 1;
      i <= prevMonthTotalDays;
      i++
    ) {
      days.push({ day: i, color: "gray_005" });
    }

    // 이번 달의 날짜를 추가
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, color: "black" });
    }

    // 다음 달의 첫 몇 일을 추가
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, color: "gray_005" });
    }

    setDays(days);
  };

  // ToDo : 월까지 체크
  const filterLecturesByDay = () => {
    const filteredLectures = {};

    lectures.forEach((lecture) => {
      lecture.dateList.forEach((date) => {
        const day = date.split("-")[2];
        if (!filteredLectures[day]) {
          filteredLectures[day] = [];
        }
        filteredLectures[day].push(lecture);
      });
    });

    setFilteredLectures(filteredLectures);
  };

  const filterLecturesByTeacher = (lectureList = [], teacher) => {
    return lectureList.filter((lecture) => lecture.teacher === teacher);
  };

  // 해당 월의 일 수를 구하는 함수
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 해당 월의 첫 요일을 구하는 함수
  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const highlightTheDay = (day) => {
    setIsHighlight({ day: day, isHighlight: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <MonthCalendarWrapper>
        <CalendarBody>
          {days.map((dayObj, index) => {
            const isFirstWeek = index < 7;
            const lectureOfDay = filteredLectures[dayObj.day];
            const isHighlightDay =
              isHighlight.day === dayObj.day && isHighlight.isHighlight;

            return (
              <DayCell key={index}>
                <DayText>
                  {isFirstWeek && (
                    <>
                      {weekDays[index]}
                      <br />
                    </>
                  )}
                </DayText>
                <DateText
                  onClick={() => highlightTheDay(dayObj.day)}
                  color={dayObj.color}
                  isHighlightDay={isHighlightDay}
                >
                  {dayObj.day}
                </DateText>
                {teacherList.map((teacher, index) => {
                  const teacherLectures = filterLecturesByTeacher(
                    lectureOfDay,
                    teacher.name
                  );

                  return (
                    teacherLectures.length > 0 && (
                      <Lecture>
                        <Teacher key={index} teacher={teacher}>
                          {teacher.name}
                        </Teacher>
                        <LectureSize>
                          수업 {teacherLectures.length}개
                        </LectureSize>
                      </Lecture>
                    )
                  );
                })}
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
  top: 5px;
`;

const DateText = styled(DayText)`
  cursor: pointer;
  margin-bottom: 10px;

  color: ${({ color }) => {
    switch (color) {
      case "gray_005": // ToDo : theme로 변경
        return "#BABABA";
      default:
        return `${theme.colors.black}`;
    }
  }};

  ${({ isHighlightDay }) =>
    isHighlightDay &&
    `
      color: ${theme.colors.primary_normal};
      border-color: ${theme.colors.primary_normal};
      border: 1px solid;
      border-radius: 50%;
      width: 25px;
      height: 30px;
    `}

  // 호버시
    &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary_normal};
    border-color: ${theme.colors.primary_normal};
    border: 1px solid;
    border-radius: 50%;
    width: 25px;
    height: 30px;
  }
`;

const Lecture = styled(RowDiv)`
  margin-bottom: 5px;
  cursor: pointer;
`;

const Teacher = styled.div`
  width: 57px;
  height: 25px;
  padding-top: 5px;
  margin-right: 5px;
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  color: ${(props) => props.theme.colors.white};
  border-radius: 100px;

  background-color: ${({ teacher }) => {
    switch (teacher.name) {
      case "김삼유":
        return "#95C25C";
      case "홍길동":
        return "#FFC14B";
      case "김수지":
        return "#A6773F";
      default:
        return "#95C25C";
    }
  }};
`;

const LectureSize = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  padding-top: 5.5px;
`;

export default MonthCalendar;
