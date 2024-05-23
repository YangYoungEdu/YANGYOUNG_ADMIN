import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  getAllLectureByDayAPI,
  getAllLectureByMonthAPI,
  getAllLectureByWeekAPI,
} from "../../API/LectureAPI";
import { ColumnDiv, RowDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";
import DayCalendar from "./DayCaleandar";
import LectureFilter from "./LectureFilter";
import LectureHeader from "./LectureHeader";
import MonthCalendar from "./MonthCalendar";
import WeekCalendar from "./WeekCalendar";

const LecturePage = () => {
  const [mode, setMode] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lectures, setLectures] = useState([]);

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
      setLectures(response);
    };

    fetchLectures();
  }, [mode, currentDate]);

  const renderCalendar = () => {
    switch (mode) {
      case "month":
        return <MonthCalendar currentDate={currentDate} lectures={lectures} />;
      case "week":
        return <WeekCalendar currentDate={currentDate} lectures={lectures} />;
      case "day":
        return <DayCalendar currentDate={currentDate} lectures={lectures} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
        <RowDiv>
          {/* 검색 필터 */}
          <LectureFilter />
          <ColumnDiv>
            {/* 캘린더 헤더 */}
            <LectureHeader
              mode={mode}
              setMode={setMode}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              setLectures={setLectures}
            />
            {/* 캘린더 */}
            {renderCalendar()}
          </ColumnDiv>
        </RowDiv>
    </ThemeProvider>
  );
};

export default LecturePage;
