import DayTable from "../../../components/Lecture/DayTable";
import React, { useState, useEffect } from 'react';
import '../../../style/css/app.css';
import { getSchedule } from '../../../components/Lecture/CalendarDetail/UserDataController.jsx';
// store
import { useCalendarState } from '../../../stores/calendarState.jsx';
import { useUserData } from '../../../stores/userData.jsx';
import DailyCell from "../../../components/Lecture/CalendarDetail/DailyCell.jsx";
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { getCalendarData } from "../../../Atom.js";

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

const DayCalendar = ({ currentDate, lectureOfDay }) => {
  const [calendarState, setCalendarState] = useCalendarState();
  const { date } = calendarState;

  const [timeTable, setTimeTable] = useState([...times]);

  const [schedule, setSchedule] = useRecoilState(getCalendarData
  );  
  // const [userData, setUserData] = useUserData();
  // const { schedule } = userData;

  const [curSchedule, setCurSchedule] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
      // date가 변경될 때마다, 해당 날짜에 대한 일정을 생성합니다.
      const { firstDate, lastDate } = getFirstAndLastDate();
      setDates(makeCalendar(firstDate));
      setSchedule(lectureOfDay);
  }, [date]);

  useEffect(() => {
      // userData가 변경될 때마다, 현재 일정을 업데이트합니다.
      const { firstDate, lastDate } = getFirstAndLastDate();
      setCurSchedule(getSchedule(firstDate, lastDate, lectureOfDay));
  }, [lectureOfDay, schedule]);

  const getFirstAndLastDate = () => {
      // 단일 날짜를 반환하도록 수정된 함수
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const firstDate = new Date(year, month, day); // 현재 선택된 날짜
      return { firstDate, lastDate: firstDate }; // firstDate와 lastDate가 동일
  };

  const makeCalendar = (currentDate) => {
    const timeArray = timeTable;
    const newDates = [[currentDate].concat(timeArray)]; // 현재 날짜와 시간 배열을 결합
      setCurSchedule(getSchedule(currentDate, currentDate, lectureOfDay)); // 현재 날짜에 해당하는 일정을 설정
      return newDates;
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

    if (curDate.getFullYear() === new Date(curSchedule[i].lectureDate).getFullYear() &&
    curDate.getMonth() === new Date(curSchedule[i].lectureDate).getMonth()&&
    curDate.getDate() === new Date(curSchedule[i].lectureDate).getDate()&& curSchedule[i].startTime.hour === propsHour && to15MinRange(curSchedule[i].startTime.minute) === propsMin ) {
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
      <WeeklyView id="weekly-view"> {/* 일간 보기로 변경 */}
          <HourCol className="hour-col">
              {timeTable.map((a, i) => (
                  <HourCell key={i} className="hour-cell">
                      {formatTime(a)}
                  </HourCell>
              ))}
          </HourCol>
          {dates.map((a, i) => (
              <WeeklyCol key={i} className="weekly-col"> {/* 일간 보기를 위한 컬럼 */}
                  {a.map((b, j) => (
                      j > 0 && ( // 시간 데이터만 표시 (날짜 데이터 제외)
                          <DailyCell // WeeklyCell을 사용하는데, 필요하다면 DailyCell로 변경
                              key={j}
                              index={j}
                              date={a[0]}
                              startHour={b}
                              schedule={getCurDateSchedule(a[0], b)}
                          />
                      )
                  ))}
              </WeeklyCol>
          ))}
      </WeeklyView>
  );
};

const WeeklyView = styled.div`
  /* width: 900px; */
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 7px;
  margin-bottom: 50px;
`;

const HourCol = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* border: solid 0.5px #111; */
  box-sizing: border-box;
`;

const HourCell = styled.div`
  width: 100%;
  height: 12.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  color: var(--gray-gray-005, #fff);
  text-align: right;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* border-top: solid 1px #BABABA; */

  &:nth-child(4n + 1) {
		color: var(--gray-gray-006, #BABABA);
  }
`;

const WeeklyCol = styled.div`
  /* width: 120px; */
  /* margin-top: 6px; */
  width: 80%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  box-sizing: border-box;
`;

export default DayCalendar;
