import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Cancel } from "../../Assets/Cancel.svg";
import { MainDiv, RowDiv } from "../../style/CommonStyle";
import { getAmPm } from "../../util/Util";
import LectureItemForMonth from "./LecutreItemForMonth";
import LectureDetailForMonth from "../../pages/Lecture/Detail/LectureDetail";

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
    <DayTimeTableWrapper>
      <InnerDiv>
        <HeaderWrapper>
          <Title>
            {isHighlight.year}년 {isHighlight.month}월 {isHighlight.day}일
          </Title>
          <CancelIcon onClick={() => setIsModalOpen(false)} />
        </HeaderWrapper>
        {timeSlot.map((slot, index) => (
          <HourWrapper key={index}>
            <HourLayout>
            {slot.minute === 0 && (
              <HourItem>
                <Hour>{getAmPm(slot.hour)}</Hour>
                <HourLine />
              </HourItem>
            )}
            </HourLayout>

            {orderLecture.map((lecture) => {
              const slotTime = `${slot.hour}:${slot.minute}`;
              const lectureStartTime = lecture.startTime;

              if (slotTime === lectureStartTime) {
                return (
                  <LectureItemForMonth
                    key={lecture.id}
                    setIsClicked={setIsClicked}
                    setSelectedLecture={setSelectedLecture}
                    lecture={lecture}
                    slot={lecture.differenceSlot}
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
      </InnerDiv>

      {isClicked && selectedLecture && (
        <LectureDetailWrapper onClick={handleOutsideClick}>
          <LectureDetailForMonth
            currentDate={currentDate}
            setIsClicked={setIsClicked}
            setSelectedLecture={setSelectedLecture}
            selectedLecture={selectedLecture}
          />
        </LectureDetailWrapper>
      )}
    </DayTimeTableWrapper>
  );
};

const DayTimeTableWrapper = styled(MainDiv)`
  background-color: white;
  position: relative;
  height: 100%;
  justify-content: flex-start;
`;

const InnerDiv = styled.div`
box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-left: 4%;
  padding-right: 2.5%;
  width: 95%;
`;
const HeaderWrapper = styled(RowDiv)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const HourWrapper = styled(RowDiv)`
`;

const HourLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

`;
const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
  font-weight: 700;
  color: ${(props)=> props.theme.colors.gray_006};
`;

const CancelIcon = styled(Cancel)`
  width: 16.5px;
  height: 18px;
  padding-top: 8px;
  cursor: pointer;
`;

const HourItem = styled(RowDiv)`
display: flex;
justify-content: space-between;
  height: 4.5vh;
`;

const Hour = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 400;
  width: 55px;
  margin-top: -7px;
`;

const HourLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  /* margin-top: 6px; */
`;

const LectureDetailWrapper = styled(MainDiv)`
  height: 100%;
  position: absolute;
  top: 0;
  left: -50vw;
  z-index: 3;
  background-color: transparent;
`;

export default DayTimeTable;
