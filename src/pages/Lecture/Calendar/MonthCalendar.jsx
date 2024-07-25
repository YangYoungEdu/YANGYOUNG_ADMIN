import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import DayTimeTable from "../../../components/Lecture/DayTimeTable";
import { theme } from "../../../style/theme";

import '../../../style/css/app.css';
import { getSchedule } from '../../../components/Lecture/UserDataController.jsx';
// store
import { useCalendarState } from '../../../stores/calendarState.jsx';
import { useUserData } from '../../../stores/userData.jsx';
import MonthlyCell from "../../../components/Lecture/MonthlyCell.jsx";

const MonthCalendar = ({
  currentDate,
  lectures,
  isHighlight,
  setIsHighlight,
}) => {
  const [ calendarState, setCalendarState ] = useCalendarState();
	const { date } = calendarState;

  const [days, setDays] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [lectureOfDay, setLectureOfDay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const teacherList = [
    { name: "김삼유", color: "#95C25C" },
    { name: "장영해", color: "#D8CD63" },
    { name: "전재우", color: "#BCD7EA" },
  ];

	const [ weekDays ] = useState([ '일', '월', '화', '수', '목', '금', '토' ]);
	const [ dates, setDates ] = useState([]); // 달력의 행
	const [ userData ] = useUserData();
	const { schedule } = userData; // 유저의 스케쥴
	const [ curSchedule, setCurSchedule ] = useState([]); // 현재 달력 날짜 안에 포함된 스케쥴

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setDates(makeCalendar(firstDate, lastDate));
		},
		[ date ]
	);

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		},
		[ userData ]
	);

	const getFirstAndLastDate = () => {
		const year = date.getFullYear();
		const month = date.getMonth();
		let firstDate = new Date(year, month, 1);
		firstDate = new Date(year, month, -firstDate.getDay() + 1);
		let lastDate = new Date(year, month + 1, 0);
		lastDate = new Date(year, month + 1, 6 - lastDate.getDay());
		return { firstDate: firstDate, lastDate: lastDate };
	};

	const makeCalendar = (firstDate, lastDate) => {
		let tempDate = new Date(firstDate);
		let newDates = [];
		let index = 0;
		while (tempDate.getMonth() !== lastDate.getMonth() || tempDate.getDate() !== lastDate.getDate()) {
			if (index % 7 === 0) newDates[parseInt(index / 7)] = [];
			newDates[parseInt(index / 7)].push(tempDate);
			tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);
			index++;
		}
		newDates[parseInt(index / 7)].push(tempDate); // 달력의 시작이 1일이고, 전 달이 30일로 끝나는 날 때문에 따로 배치
		setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		return newDates.slice();
	};

	const getCurDateSchedule = (curDate) => {
		const curDateSchedule = [];
		curSchedule.forEach((date) => {
			if (date.curDate.getTime() - curDate.getTime() === 0) {
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
					<MonthlyRow key={i}  className="monthly-row">
						{a.map((b, j) => (
              <MonthlyCell key={j} date={b} schedule={getCurDateSchedule(b)} />
            ))}
					</MonthlyRow>
				))}
			</MonthlyView>
	);
};

const MonthlyView = styled.div`
  width: 840px;
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
  border-bottom: solid 2px #111;
`;

const DayCell = styled.div`
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-right: solid 1px #111;
  border-top: solid 1px #111;
	/* all: initial; */
  
  &:nth-child(1) {
    border-left: solid 1px #111;
    color: #ef7a8b;
  }

  &:nth-child(7) {
    color: #769bff;
  }
`;

const MonthlyRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: solid 1px #111;
	
`;

export default MonthCalendar;
