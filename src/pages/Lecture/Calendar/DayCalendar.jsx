import DayTable from "../../../components/Lecture/DayTable";

const DayCalendar = ({ currentDate, lectureOfDay }) => {
  return (
    <>
      <DayTable lectureList={lectureOfDay} />
    </>
  );
};

export default DayCalendar;
