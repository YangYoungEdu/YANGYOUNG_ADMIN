import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";

const AttendanceSelect = () => {
  const [date, setDate] = useState(new Date());

  return (
    <MainDiv>
      <h1>AttendanceSelect</h1>
      <StyledCalendarWrapper>
        <StyledCalendar
        onChange={setDate}/>
        <p>Selected Date: {date.toDateString}</p>
      </StyledCalendarWrapper>
    </MainDiv>
  );
};

const StyledCalendar = styled(Calendar)`

`;

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
// 캘린더를 불러옴

export default AttendanceSelect;
