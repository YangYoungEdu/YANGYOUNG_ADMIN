import Calendar from "react-calendar";
import styled from "styled-components";
import { ReactComponent as Prev } from "../../Assets/Prev.svg";
import { ReactComponent as Next } from "../../Assets/Next.svg";
import { ko } from "date-fns/locale";

const CalendarComponent = ({ date, selectedDate, handleDateChange, tileClassName }) => (
  <CalendarWrapper>
    <Calendar
      onChange={handleDateChange}
      value={selectedDate}
      locale={ko}
      formatDay={(locale, date) => moment(date).format("DD")}
      nextLabel={<Next />}
      prevLabel={<Prev />}
      tileClassName={tileClassName}
    />
  </CalendarWrapper>
);

const CalendarWrapper = styled.div`
  display: flex;
  width: 50%;
`;

export default CalendarComponent;
