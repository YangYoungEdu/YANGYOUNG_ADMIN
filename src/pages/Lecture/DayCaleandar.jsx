import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";
import DayTable from "../../components/Lecture/DayTable";

const DayCalendar = ({ currentDate, lectureOfDay }) => {
  const Date = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  };
  return (
    <>
      <DayTable lectureList={lectureOfDay}/>
    </>
  );
};

export default DayCalendar;
