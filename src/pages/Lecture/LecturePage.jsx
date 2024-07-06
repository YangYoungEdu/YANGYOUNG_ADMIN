import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  getAllLectureByDayAPI,
  getAllLectureByMonthAPI,
  getAllLectureByWeekAPI,
} from "../../API/LectureAPI";
import { ColumnDiv, RowDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";
import LectureHeader from "../../components/Lecture/LectureHeader";
import LectureFilter from "../../components/Lecture/LectureFilter";
import DayCalendar from "./Calendar/DayCalendar";
import WeekCalendar from "./Calendar/WeekCalendar";
import MonthCalendar from "./Calendar/MonthCalendar";

const LecturePage = () => {
  const [mode, setMode] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [originLectures, setOriginLectures] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [isToday, setIsToday] = useState(false);
  const [isHighlight, setIsHighlight] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
    isHighlight: false,
  });

  useEffect(() => {
    const fetchLectures = async () => {
      let response;
      switch (mode) {
        case "month":
          response = await getAllLectureByMonthAPI(currentDate);
          break;
        case "week":
          response = await getAllLectureByWeekAPI(currentDate);
          break;
        case "day":
          response = await getAllLectureByDayAPI(currentDate);
          break;
        default:
          response = [];
      }
      setOriginLectures(response);
      setLectures(response);
    };

    fetchLectures();
  }, [mode, currentDate]);

  const renderCalendar = () => {
    switch (mode) {
      case "month":
        return (
          <MonthCalendar
            currentDate={currentDate}
            lectures={lectures}
            isHighlight={isHighlight}
            setIsHighlight={setIsHighlight}
          />
        );
      case "week":
        return <WeekCalendar currentDate={currentDate} lectures={lectures} />;
      case "day":
        return (
          <DayCalendar currentDate={currentDate} lectureOfDay={lectures} />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <RowDiv>
        {/* 검색 필터 */}
        <LectureFilter
          mode={mode}
          originLectures={originLectures}
          setLectures={setLectures}
        />
        <ColumnDiv>
          {/* 캘린더 헤더 */}
          <LectureHeader
            mode={mode}
            setMode={setMode}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setLectures={setLectures}
            setIsHighlight={setIsHighlight}
            isToday={isToday}
            setIsToday={setIsToday}
          />
          {/* 캘린더 */}
          {renderCalendar()}
        </ColumnDiv>
      </RowDiv>
    </ThemeProvider>
  );
};

export default LecturePage;
