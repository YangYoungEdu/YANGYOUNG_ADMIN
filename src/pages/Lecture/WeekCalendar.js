import React, { useEffect } from "react";
import styled from "styled-components";
import { MainDiv, RowDiv, ColumnDiv } from "../../style/CommonStyle";

const Calendar = ({ currentDate, lectures }) => {
  const hourList = Array.from({ length: 17 }, (_, i) => 7 + i); // 7 AM to 11 PM
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    renderLectures();
  }, []);

  const renderLectures = () => {
    let lectureList = lectures;

    // 요일, 시간, 분 단위로 강의 시간을 표시할 배열
    const lectureSlots = Array.from({ length: 7 }, () =>
      Array.from({ length: 24 }, () => Array.from({ length: 12 }, () => false))
    );

    for (let i = 0; i < lectureList.length; i++) {
      const startTime = lectureList[i].startTime;
      const startHour = parseInt(startTime.split(":")[0]);
      const startMinute = parseInt(startTime.split(":")[1]);

      const endTime = lectureList[i].endTime;
      const endHour = parseInt(endTime.split(":")[0]);
      const endMinute = parseInt(endTime.split(":")[1]);

      // 시작 시간부터 종료 시간까지의 강의 시간을 표시
      for (let hour = startHour; hour <= endHour; hour++) {
        const startSegment =
          hour === startHour ? Math.ceil(startMinute / 5) : 0;
        const endSegment = hour === endHour ? Math.floor(endMinute / 5) : 11;

        for (let segment = startSegment; segment <= endSegment; segment++) {
          lectureSlots[i][hour][segment] = true;
        }
      }
    }

    // 강의 시간에 따라 캘린더에 시간을 표시
    return (
      <>
        {dayList.map((_, dayIndex) => (
          <DayColumn key={dayIndex}>
            {hourList.map((hour, hourIndex) => (
              <HourRow key={hourIndex}>
                {Array.from({ length: 12 }, (_, segmentIndex) => (
                  <MinuteSegment key={segmentIndex}>
                    {lectureSlots[dayIndex][hour][segmentIndex] ? "하이" : "ㅜ"}
                  </MinuteSegment>
                ))}
              </HourRow>
            ))}
          </DayColumn>
        ))}
      </>
    );
  };

  // 오전 오후 시간 반환
  const getTime = (hour) => {
    const isAM = hour < 12;
    const formattedHour = isAM ? hour : hour - 12;
    const period = isAM ? "오전" : "오후";
    const displayHour = formattedHour === 0 ? 12 : formattedHour;

    return `${period} ${displayHour}시`;
  };

  // 요일을 받아서 해당 요일의 날짜를 반환
  const getDay = (day) => {
    const dayIndex = dayList.indexOf(day);
    if (dayIndex === -1) {
      return;
    }

    const current = new Date(currentDate);
    const diff = dayIndex - current.getDay();

    const targetDate = new Date(current);
    targetDate.setDate(current.getDate() + diff);

    return targetDate.getDate();
  };

  return (
    <WeekCalendarContainer>
      {/* 주간 캘린더 헤더 */}
      <WeekCalendarHeader>
        {dayList.map((day, index) => (
          <HeaderCell key={index}>
            <DayText>{day}</DayText>
            <DateText> {getDay(day)}</DateText>
          </HeaderCell>
        ))}
      </WeekCalendarHeader>
      <RowDiv>
        {/* 시간축 */}
        <TimeAxis>
          {hourList.map((hour, index) => (
            <>
              <TimeCell key={index}>{getTime(hour)}</TimeCell>
            </>
          ))}
        </TimeAxis>
        {/* 주간 캘린더 바디 */}
        <WeekCalendarBody>{renderLectures()}</WeekCalendarBody>
      </RowDiv>
    </WeekCalendarContainer>
  );
};

const WeekCalendarContainer = styled(MainDiv)``;

const WeekCalendarHeader = styled(RowDiv)`
  width: 93%;
  justify-content: space-between;
  padding-right: 5%;
`;

const HeaderCell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const DayText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
`;

const DateText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
`;

const TimeAxis = styled(ColumnDiv)`
  width: 50px;
`;

const TimeCell = styled.div`
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeekCalendarBody = styled(RowDiv)`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const DayColumn = styled(ColumnDiv)`
  flex: 1;
  border: 1px solid black;
`;

const HourRow = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  height: 48px;
`;

const MinuteSegment = styled.div`
  width: 100%;
  height: 20px;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
`;

export default Calendar;
