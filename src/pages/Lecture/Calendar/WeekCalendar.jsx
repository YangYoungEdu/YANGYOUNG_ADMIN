import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../../style/css/app.css';
// import WeeklyCell from './WeeklyCell';
import { getSchedule } from '../../../components/Lecture/UserDataController';
// store
import { useCalendarState } from '../../../stores/calendarState';
import { useUserData } from '../../../stores/userData';
import WeeklyCell from "../../../components/Lecture/WeeklyCell";

//15분 간격 배열 추가
export const times = [
	'07:00', '07:15', '07:30', '07:45',
	'08:00', '08:15', '08:30', '08:45',
	'09:00', '09:15', '09:30', '09:45',
	'10:00', '10:15', '10:30', '10:45',
	'11:00', '11:15', '11:30', '11:45',
	'12:00', '12:15', '12:30', '12:45',
	'13:00', '13:15', '13:30', '13:45',
	'14:00', '14:15', '14:30', '14:45',
	'15:00', '15:15', '15:30', '15:45',
	'16:00', '16:15', '16:30', '16:45',
	'17:00', '17:15', '17:30', '17:45',
	'18:00', '18:15', '18:30', '18:45',
	'19:00', '19:15', '19:30', '19:45',
	'20:00', '20:15', '20:30', '20:45',
	'21:00', '21:15', '21:30', '21:45',
	'22:00', '22:15', '22:30', '22:45',
	'23:00', '23:15', '23:30', '23:45'
]

const WeekCalendar = ({ currentDate, lectures }) => {
	const [ calendarState, setCalendarState ] = useCalendarState();
	const { date } = calendarState;

	const [ dates, setDates ] = useState([]);
	const [timeTable, setTimeTable] = useState(['', '', ...times]); 

	const [ userData, setUserData ] = useUserData();
	const { schedule } = userData;

	const [ curSchedule, setCurSchedule ] = useState([]);

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
			console.log('주간 일정',curSchedule );
		},
		[ userData ]
	);

	const getFirstAndLastDate = () => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();
		const firstDate = new Date(year, month, date.getDate() - day);
		const lastDate = new Date(year, month, date.getDate() + (6 - day));
		return { firstDate: firstDate, lastDate: lastDate };
	};

	const makeCalendar = (firstDate, lastDate) => {
		let tempDate = new Date(firstDate);
		const newDates = [ [ '일' ], [ '월' ], [ '화' ], [ '수' ], [ '목' ], [ '금' ], [ '토' ] ];
		const tempTime = times;  //15분 간격 배열 추가
		
		let index = 0;
		while (tempDate.getDate() !== lastDate.getDate()) {
			newDates[index].push(tempDate);
			newDates[index] = newDates[index].concat(tempTime);
			tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);
			index++;
		}
		newDates[index].push(tempDate);
		newDates[index] = newDates[index].concat(tempTime);
		setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		return newDates.slice();
	};

	const getCurDateSchedule = (curDate, startHour) => {
		let curDateSchedule = null;

		// HH:MM string 형식 분할 후 number 타입 변환
		const [propsHour, propsMin] = (typeof startHour === 'string' ? startHour.split(':') : ['0', '0']).map(Number);

    // 분값을 15분 단위로 구간 나누어 변환하는 함수
    const to15MinRange = (minutes) => {
			if (minutes < 15) return 0;
			if (minutes < 30) return 15;
			if (minutes < 45) return 30;
			return 45;
	};

		for (let i = 0; i < curSchedule.length; i++) {

			if (curDate.getTime() === curSchedule[i].curDate.getTime() && curSchedule[i].startTime.hour === propsHour && to15MinRange(curSchedule[i].startTime.minute) === propsMin ) {
				curDateSchedule = curSchedule[i];
				break;
			}
		}
		
		return curDateSchedule;
	};

	function formatTime(time) {
		const [hours, minutes] = time.split(':').map(Number);
		const period = hours < 12 ? '오전' : '오후';
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
		return `${period} ${formattedHours}시`;
	}

	return (
		<WeeklyView id="weekly-view">
			<HourCol className="hour-col">
				{timeTable.map((a, i) => (
					<HourCell key={i} className="hour-cell">
						 <span>{formatTime(a)}</span>
					</HourCell>
				))}
			</HourCol>
			{console.log('주간 dates형식', dates)}
			{dates.map((a, i) => (
				<WeeklyCol key={i} className="weekly-col">
					{a.map((b, j) => (
						<WeeklyCell
							key={j}
							index={j}
							day={a[0]}
							date={a[1]}
							startHour={b}
							schedule={getCurDateSchedule(a[1], b)}
						/>
					))}
				</WeeklyCol>
			))}
		</WeeklyView>
	);
};

const WeeklyView = styled.div`
   /* width: 900px;  */
	 	width: 85%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 50px; 
`;

// 시간 열
const HourCol = styled.div`
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: solid 1px #E0E0E0;
    box-sizing: border-box;
`;

// 시간 셀
const HourCell = styled.div`
  width: 100%;
  /* height: 50px; */
	height: 12.5px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  box-sizing: border-box;

	color: var(--gray-gray-006, #FFF); 
	text-align: right;
	font-family: "Pretendard Variable";
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

  &:nth-child(1) {
    height: 42px;
  }

  &:nth-child(2) {
    height: 42px;
  }

	&:nth-child(4n + 3) {
		color: var(--gray-gray-006, #555);
  }
	&:nth-child(4n + 7) {
		color: var(--gray-gray-006, #555);
		border-top: solid 1px #E0E0E0;
  }

	& >span{
		border-top: solid 1px #FFF;
		border-bottom: solid 1px #FFF;
		padding-right:7px ;
	}

`;

// 주간 열
const WeeklyCol = styled.div`
    width: 151.159px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: solid 1px #E0E0E0;
    box-sizing: border-box;

`;

export default WeekCalendar;
