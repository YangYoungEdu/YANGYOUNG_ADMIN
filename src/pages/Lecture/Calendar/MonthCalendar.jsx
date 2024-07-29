import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import DayTimeTable from "../../../components/Lecture/DayTimeTable";
import { theme } from "../../../style/theme";

import "../../../style/css/app.css";
import { getSchedule } from "../../../components/Lecture/CalendarDetail/UserDataController.jsx";
// store
import { useCalendarState } from "../../../stores/calendarState.jsx";
import { useUserData } from "../../../stores/userData.jsx";
import MonthlyCell from "../../../components/Lecture/CalendarDetail/MonthlyCell.jsx";
import { getCalendarData } from "../../../Atom.js";
import { useRecoilState } from "recoil";

const MonthCalendar = ({
  currentDate,
  lectures,
  isHighlight,
  setIsHighlight,
}) => {
  // 전역 변수로부터 현재 날짜를 가져옴
  const [calendarState, setCalendarState] = useCalendarState();
  const { date } = calendarState;
  const [selectedDate, setSelectedDate] = useState(null);

  const [days, setDays] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [lectureOfDay, setLectureOfDay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const teacherList = [
    { name: "김삼유", color: "#95C25C" },
    { name: "장영해", color: "#D8CD63" },
    { name: "전재우", color: "#BCD7EA" },
  ];

  const [weekDays] = useState(["월", "화", "수", "목", "금", "토", "일"]);
  const [dates, setDates] = useState([]); // 달력의 행

  const [schedule, setSchedule] = useRecoilState(getCalendarData);
  // const [userData] = useUserData();
  // const { schedule } = userData; // 유저의 스케쥴

  const [curSchedule, setCurSchedule] = useState([]); // 현재 달력 날짜 안에 포함된 스케쥴

  const handleDateClick = (date) => {
	setSelectedDate(date);
  };

  //date, userData 변경될 때마다 캘린더와 스케줄 업데이트
  useEffect(() => {
    const { firstDate, lastDate } = getFirstAndLastDate();
    setDates(makeCalendar(firstDate, lastDate));
    setSchedule(lectures);
  }, [date]);

  useEffect(() => {
    const { firstDate, lastDate } = getFirstAndLastDate();
    setCurSchedule(getSchedule(firstDate, lastDate, lectures));
  }, [lectures, schedule]);

   // 주어진 달의 첫 번째와 마지막 날짜 계산하여 반환
   const getFirstAndLastDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    let firstDate = new Date(year, month, 1);
    firstDate = new Date(firstDate.setDate(firstDate.getDate() - ((firstDate.getDay() + 6) % 7)));
    let lastDate = new Date(year, month + 1, 0);
    lastDate = new Date(lastDate.setDate(lastDate.getDate() + (7 - lastDate.getDay()) % 7));
    return { firstDate: firstDate, lastDate: lastDate };
  };

  // 캘린더 생성 (주어진 시작 날짜와 끝 날짜 기준으로 날짜 배열)
  const makeCalendar = (firstDate, lastDate) => {
    let tempDate = new Date(firstDate);
    let newDates = [];
    let index = 0;
    while (tempDate <= lastDate) {
      if (index % 7 === 0) newDates[parseInt(index / 7)] = [];
      newDates[parseInt(index / 7)].push(new Date(tempDate));
      tempDate = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate() + 1
      );
      index++;
    }
    setCurSchedule(getSchedule(firstDate, lastDate, lectures));
    return newDates.slice();
  };

  // 현재 날짜의 스케줄 가져오기
  const getCurDateSchedule = (curDate) => {
    const curDateSchedule = [];
    curSchedule.forEach((date) => {
      const lectureDate = new Date(date.lectureDate);
      // 날짜만 비교 (연도, 월, 일)
      if (
        lectureDate.getFullYear() === curDate.getFullYear() &&
        lectureDate.getMonth() === curDate.getMonth() &&
        lectureDate.getDate() === curDate.getDate()
      ) {
        curDateSchedule.push(date);
      }
    });
    return curDateSchedule;
  };
  

	return (
			<MonthlyView id="monthly-view">
				<DayRow className="day-row">
					{weekDays.map((a, i) => (
						<DayCell key={i} className="day-cell">
							{a}
						</DayCell>
					))}
				</DayRow>

      {dates.map((a, i) => (
        <MonthlyRow
          key={i}
          // className="monthly-row"
        >
          {a.map((b, j) => (
            <MonthlyCell key={j} date={b} schedule={getCurDateSchedule(b)} 
			isSelected={selectedDate && b.toDateString() === selectedDate.toDateString()}
			onClick = {() => handleDateClick(b)}/>
          ))}
        </MonthlyRow>
      ))}
    </MonthlyView>
  );
};

const MonthlyView = styled.div`
  width: 1120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
`;

const DayRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: solid 4px #E0E0E0;
`;

const DayCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 160px;
  height: 53px;

  box-sizing: border-box;

  font-size: 20px;
  font-weight: 500;

  &:nth-child(1) {
  }

  &:nth-child(7) {
  }
`;

const MonthlyRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: solid 1px #E0E0E0;
`;

export default MonthCalendar;
