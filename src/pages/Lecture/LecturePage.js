import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { MainDiv, RowDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";
import DayCalendar from "./DayCaleandar";
import LectureFilter from "./LectureFilter";
import LectureHeader from "./LectureHeader";
import MonthCalendar from "./MonthCalendar";
import WeekCalendar from "./WeekCalendar";

const LecturePage = () => {
  const [mode, setMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lectures, setLectures] = useState([]);

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
      <MainDiv>
        {/* 캘린더 헤더 */}
        <LectureHeader
          mode={mode}
          setMode={setMode}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setLectures={setLectures}
        />
        <RowDiv>
          {/* 검색 필터 */}
          <LectureFilter />
          {/* 캘린더 */}
          {renderCalendar()}
        </RowDiv>
      </MainDiv>
    </ThemeProvider>
  );
};

export default LecturePage;
