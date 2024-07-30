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
import LectureFilter from "../../components/Lecture/CalendarDetail/LectureFilter.jsx";
import DayCalendar from "./Calendar/DayCalendar";
import WeekCalendar from "./Calendar/WeekCalendar";
import MonthCalendar from "./Calendar/MonthCalendar";

import { useRecoilState } from "recoil";
import { getCalendarData } from "../../Atom.js";
import CalendarModal from "../../components/Lecture/CalendarModal/CalendarModal.jsx";
// import CalendarModal from "../../components/Lecture/CalendarDetail/CalendarModal.jsx";

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

  const [calSchedule, setCalSchedule] = useRecoilState(getCalendarData
  );

  useEffect(() => {
    const fetchLectures = async () => {
      let response;
      switch (mode) {
        case "month":
          response = await getAllLectureByMonthAPI(currentDate);
          // console.log('월 일정', response);
          break;
        case "week":
          response = await getAllLectureByWeekAPI(currentDate);
          // console.log('주 일정', response);
          break;
        case "day":
          response = await getAllLectureByDayAPI(currentDate);
          // console.log('일 일정', response);
          break;
        default:
          response = [];
      }
      setOriginLectures(response);
      setLectures(response);
    };

    fetchLectures();
  }, [mode, currentDate, calSchedule]);

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
        <RowDiv>
          {/* 검색 필터 */}
          <LectureFilter
            mode={mode}
            originLectures={originLectures}
            setLectures={setLectures}
          />
          {/* 캘린더 */}
          {renderCalendar()}
        </RowDiv>
        <CalendarModal/>
      </ColumnDiv>
    </ThemeProvider>
  );
};

export default LecturePage;
