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

// import '../../style/css/app.css';
import ErrorPopup from '../../components/Lecture/ErrorPopup.jsx';
import { useUserData } from '../../stores/userData.jsx';
import AddForm from "../../components/Lecture/AddForm.jsx";

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

  const [ userData, setUserData ] = useUserData();

	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(
		() => {
			saveUserData();
		},
		[ userData ]
	);

	const saveUserData = () => {
		const data = JSON.stringify(userData);
		localStorage.setItem('userData', data);
	};

	const loadUserData = () => {
		const data = JSON.parse(localStorage.getItem('userData'));
    if (!data || !Array.isArray(data.schedule)) {
      // If data is undefined or data.schedule is not an array, use default empty array
      return;
    }
		setUserData({
			...userData,
			schedule: data.schedule.map((a) => {
				return { ...a, curDate: new Date(a.curDate) };
			})
		});
	};

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
        <AddForm/>
        <ErrorPopup />
      </ColumnDiv>
    </ThemeProvider>
  );
};

export default LecturePage;
