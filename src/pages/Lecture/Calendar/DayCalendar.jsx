import DayTable from "../../../components/Lecture/DayTable";
import React, { useState, useEffect } from 'react';
import '../../../style/css/app.css';
import { getSchedule } from '../../../components/Lecture/UserDataController.jsx';
// store
import { useCalendarState } from '../../../stores/calendarState.jsx';
import { useUserData } from '../../../stores/userData.jsx';
import DailyCell from "../../../components/Lecture/DailyCell.jsx";
import styled from 'styled-components';

//15분 간격 배열 추가
export const times = [
	'00:00', '00:15', '00:30', '00:45',
	'01:00', '01:15', '01:30', '01:45',
	'02:00', '02:15', '02:30', '02:45',
	'03:00', '03:15', '03:30', '03:45',
	'04:00', '04:15', '04:30', '04:45',
	'05:00', '05:15', '05:30', '05:45',
	'06:00', '06:15', '06:30', '06:45',
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

  const [timeTable, setTimeTable] = useState(['', '', ...times]);

  const [userData, setUserData] = useUserData();
  const { schedule } = userData;

  const [curSchedule, setCurSchedule] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
      // date가 변경될 때마다, 해당 날짜에 대한 일정을 생성합니다.
      const { firstDate, lastDate } = getFirstAndLastDate();
      setDates(makeCalendar(firstDate));
  }, [date]);

  useEffect(() => {
      // userData가 변경될 때마다, 현재 일정을 업데이트합니다.
      const { firstDate, lastDate } = getFirstAndLastDate();
      setCurSchedule(getSchedule(firstDate, lastDate, schedule));
  }, [userData]);

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
      setCurSchedule(getSchedule(currentDate, currentDate, schedule)); // 현재 날짜에 해당하는 일정을 설정
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

    if (curDate.getTime() === curSchedule[i].curDate.getTime() && curSchedule[i].startTime.hour === propsHour && to15MinRange(curSchedule[i].startTime.minute) === propsMin ) {
      curDateSchedule = curSchedule[i];
      break;
    }
  }

  return curDateSchedule;
};

  return (
      <WeeklyView id="weekly-view"> {/* 일간 보기로 변경 */}
          <HourCol className="hour-col">
              {timeTable.map((a, i) => (
                  <HourCell key={i} className="hour-cell">
                      {a}
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
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 50px;
`;

const HourCol = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 0.5px #111;
  box-sizing: border-box;
`;

const HourCell = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  &:nth-child(1) {
    height: 30px;
  }

  &:nth-child(2) {
    height: 30px;
    border-bottom: solid 2px #111;
  }
`;

const WeeklyCol = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: solid 0.5px #111;
  border-top: solid 0.5px #111;
  border-bottom: solid 0.5px #111;
  box-sizing: border-box;
`;

const WeeklyCell = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  overflow: visible;

  &:nth-child(1) {
    display: flex;
    align-items: center;
    height: 30px;
  }

  &:nth-child(2) {
    display: flex;
    align-items: center;
    height: 30px;
    border-bottom: solid 2px black;
  }

  &:nth-child(n + 3) {
    border-bottom: solid 1px #111;
  }
`;

const WeeklySchedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  background: #111;
  color: #eee;
  font-size: 12px;
  padding: 5px;
  border: solid 1px #111;
  margin: 5px;
  border-radius: 5px;
  z-index: 3;
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 0.5;
  }

  p {
    width: 100px;
    margin: 0;
    overflow: scroll;
  }
`;

export default DayCalendar;
