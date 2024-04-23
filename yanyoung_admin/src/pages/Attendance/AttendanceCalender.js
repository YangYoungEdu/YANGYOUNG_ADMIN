import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";

const AttendanceSelect = () => {
  return (
    <MainDiv>
      <h1>AttendanceSelect</h1>
      <StyledCalendarWrapper>
        <StyledCalendar />
      </StyledCalendarWrapper>
    </MainDiv>
  );
};

const StyledCalendar = styled(Calendar)``;

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;
// 캘린더를 불러옴

export default AttendanceSelect;
