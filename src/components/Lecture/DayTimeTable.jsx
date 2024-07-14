import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Cancel } from "../../Assets/Cancel.svg";
import { MainDiv, RowDiv } from "../../style/CommonStyle";
import { getAmPm } from "../../util/Util";
import LectureItem from "./LecutreItem";
import LectureDeatil from "../../pages/Lecture/Detail/LectureDetail";

const DayTimeTable = ({
  currentDate,
  lectureOfDay,
  isHighlight,
  setIsModalOpen,
}) => {
  const [orderLecture, setOrderLecture] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  
  useEffect(() => {
    orderLectureByTime(lectureOfDay);
  }, [lectureOfDay]);

  const timeSlot = [];
  for (let hour = 7; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      timeSlot.push({ hour, minute });
    }
  }

  const orderLectureByTime = () => {
    let orderLecture = [];

    lectureOfDay.forEach((lecture) => {
      const startTime = lecture.startTime;
      const [startHour, startMinute] = startTime.split(":");
      const endTime = lecture.endTime;
      const [endHour, endMinute] = endTime.split(":");

      let totalStartMinute = parseInt(startHour) * 60 + parseInt(startMinute);
      let totalEndMinute = parseInt(endHour) * 60 + parseInt(endMinute);
      let differenceMinutes = totalEndMinute - totalStartMinute;
      let differenceSlot = differenceMinutes / 5;

      orderLecture.push({
        ...lecture,
        differenceSlot,
      });
    });

    setOrderLecture(orderLecture);
  };

  const handleCloseModal = () => {
    setIsClicked(false);
    setSelectedLecture(null);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      <DayTimeTableWrapper>
        <HeaderWrapper>
          <Title>
            {isHighlight.year}년 {isHighlight.month}월 {isHighlight.day}일
          </Title>
          <CancelIcon onClick={() => setIsModalOpen(false)} />
        </HeaderWrapper>
        {timeSlot.map((slot, index) => (
          <HourWrapper>
            {slot.minute === 0 && (
              <HourItem>
                <Hour>{getAmPm(slot.hour)}</Hour>
                <HourLine />
              </HourItem>
            )}

            {orderLecture.map((lecture) => {
              const slotTime = `${slot.hour}:${slot.minute}`;
              const lectureStartTime = lecture.startTime;

              if (slotTime === lectureStartTime) {
                return (
                  <LectureItem
                    setIsClicked={setIsClicked}
                    setSelectedLecture={setSelectedLecture}
                    lecture={lecture}
                    slot={lecture.diffrenceSlot}
                  />
                );
              }

              return null;
            })}
          </HourWrapper>
        ))}
        <HourItem>
          <Hour>&nbsp;</Hour>
          <HourLine />
        </HourItem>
      </DayTimeTableWrapper>

      {isClicked && selectedLecture && (
        <LectureDeatilWrapper onClick={handleOutsideClick}>
          <LectureDeatil
            currentDate={currentDate}
            setIsClicked={setIsClicked}
            setSelectedLecture={setSelectedLecture}
            selectedLecture={selectedLecture}
          />
        // </LectureDeatilWrapper>
      )}
    </>
  );
};

const DayTimeTableWrapper = styled(MainDiv)`
  /* background-color: aliceblue; */
  background-color: white;
  position: relative;
`;

const HeaderWrapper = styled(RowDiv)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const HourWrapper = styled(RowDiv)``;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
  padding-left: 46px;
`;

const CancelIcon = styled(Cancel)`
  width: 16.5px;
  height: 18px;
  padding-right: 55px;
  padding-top: 8px;
  cursor: pointer;
`;

const HourItem = styled(RowDiv)`
  height: 4.5vh;
`;

const Hour = styled.div`
  font-size: 10px;
  font-weight: 400;
  width: 55px;
  margin-top: -7px;
  /* height: 4.66vh; */
  /* padding-bottom: -10px; */
`;

const HourLine = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  /* margin-top: 6px; */
`;

const LectureDeatilWrapper = styled(MainDiv)`
  height: 100%;
  position: absolute;
  top: 0;
  left: -50vw;
  z-index: 3;
  background-color: transparent;
`;

export default DayTimeTable;
