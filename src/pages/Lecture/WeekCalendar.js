import React from "react";
import styled from "styled-components";
import { MainDiv, RowDiv, ColumnDiv } from "../../style/CommonStyle";

const Calendar = ({ currentDate, lectures }) => {
  const hourList = Array.from({ length: 17 }, (_, i) => 7 + i); // 7 AM to 11 PM
  const dayList = ["월", "화", "수", "목", "금", "토", "일"];

  const getTime = () =>{

  }

  const getDay = () =>{
    
  }

  return (
    <WeekCalendarContainer>
      <WeekCalendarHeader>
        {dayList.map((day, index) => (
          <HeaderCell key={index}>{day}</HeaderCell>
        ))}
      </WeekCalendarHeader>
      <RowDiv>
        <TimeAxis>
          {hourList.map((hour, index) => (
            <TimeCell key={index}>{hour}</TimeCell>
          ))}
        </TimeAxis>
        <WeekCalendarBody>
          {dayList.map((_, dayIndex) => (
            <DayColumn key={dayIndex}>
              {hourList.map((hour, hourIndex) => (
                <HourRow key={hourIndex}>
                  {Array.from({ length: 12 }, (_, segmentIndex) => (
                    <MinuteSegment key={segmentIndex} />
                  ))}
                </HourRow>
              ))}
            </DayColumn>
          ))}
        </WeekCalendarBody>
      </RowDiv>
    </WeekCalendarContainer>
  );
};

const WeekCalendarContainer = styled(MainDiv)`
`;

const WeekCalendarHeader = styled(RowDiv)`
  width: 100%;
  justify-content: space-between;
`;

const HeaderCell = styled.div`
  flex: 1;
  text-align: center;
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
  height: 240px;
`;

const MinuteSegment = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
  height: 20px;
  box-sizing: border-box;
`;

export default Calendar;
