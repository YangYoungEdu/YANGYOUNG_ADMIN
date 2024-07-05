import styled from "styled-components";
import DayTimeTable from "./DayTimeTable";

const DayCalendar = ({ currentDate, lectureOfDay }) => {
  const Date = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  };
  return (
    <div>
      <DayTimeTable isHighlight={Date} lectureOfDay={lectureOfDay} />
    </div>
  );
};

export default DayCalendar;
