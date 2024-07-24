import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { getAllLectureByDayAPI, getAttendanceByLectureAndDateAPI, updateAttendanceAPI } from "../../API";
import { ReactComponent as Rect } from "../../Assets/Rect.svg";
import { ReactComponent as Prev } from "../../Assets/Prev.svg";
import { ReactComponent as Next } from "../../Assets/Next.svg";
import moment from "moment";
import { ko } from "date-fns/locale";
import CalendarComponent from "./CalendarComponent";
import LectureList from "./LectureList";
import AttendanceTable from "./AttendanceTable";
import styled from "styled-components";

const AttendanceSelect = () => {
  const [date, setDate] = useState(new Date());
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [activeLectureId, setActiveLectureId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    handleDateChange(date);
  }, [date]);

  useEffect(() => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (isUpdated) {
      getAttendanceByLectureAndDateAPI(selectedLecture, formattedDate).then(
        (res) => {
          setAttendance(res);
        }
      );
      setIsUpdated(false);
    }
  }, [isUpdated, selectedLecture, date]);

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
    try {
      const formattedDate = moment(newDate).format("YYYY-MM-DD");
      const response = await getAllLectureByDayAPI(formattedDate);
      setLectures(response || []);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  const formatLectures = () => {
    const timeSlotMap = new Map();
    (lectures || []).forEach((lecture) => {
      const startTime = moment(lecture.startTime, "HH:mm", true);
      const endTime = moment(lecture.endTime, "HH:mm", true);
      if (!startTime.isValid() || !endTime.isValid()) {
        return;
      }
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      const timeSlot = `${formattedStartTime} ~ ${formattedEndTime}`;
      if (!timeSlotMap.has(timeSlot)) {
        timeSlotMap.set(timeSlot, []);
      }
      timeSlotMap.get(timeSlot).push({ name: lecture.name, id: lecture.id });
    });
    return Array.from(timeSlotMap.entries());
  };

  const formatTime = (time) => {
    const hour = time.hour();
    const minute = time.minute();
    const period = hour < 12 ? "오전" : "오후";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${hour12}:${minute < 10 ? `0${minute}` : minute}`;
  };

  const handleLectureSelect = async (lectureId) => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await getAttendanceByLectureAndDateAPI(lectureId, formattedDate);
      setAttendance(response || []);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAttendance = async () => {
    const updateRequest = attendance
      .filter((item) => item.attendanceType !== null)
      .map((item) => ({
        id: item.id,
        studentId: item.studentId,
        lectureId: selectedLecture,
        attendanceType: item.attendanceType,
        note: "수동 출결",
      }));

    try {
      await updateAttendanceAPI(updateRequest);
      setIsUpdated(true);
      alert("출석 정보가 변경되었습니다.");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleOptionChange = (e, studentId) => {
    const { value } = e.target;
    const updatedAttendances = attendance.map((item) =>
      item.studentId === studentId ? { ...item, attendanceType: value } : item
    );
    setAttendance(updatedAttendances);
  };

  const handleLectureClick = (selectedLectureId) => {
    setActiveLectureId(selectedLectureId);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (moment(date).isSame(selectedDate, "day")) {
        return "selected-date";
      }
    }
    return null;
  };

  const formattedLectures = formatLectures();

  return (
    <MainDiv>
      <CalendarComponent
        date={date}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        tileClassName={tileClassName}
      />
      <LectureList
        lectures={formattedLectures}
        selectedLecture={selectedLecture}
        onLectureSelect={(id) => {
          setSelectedLecture(id);
          handleLectureSelect(id);
          handleLectureClick(id);
        }}
      />
      <AttendanceTable
        attendance={attendance}
        updateAttendance={updateAttendance}
        handleOptionChange={handleOptionChange}
      />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 70%;
  margin: 74px auto;
`;

export default AttendanceSelect;
