import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainDiv, RowDiv } from "../../style/CommonStyle";
import { getAmPm } from "../../util/Util";
import LectureItem from "./LecutreItem";

const DayTimeTable = ({ lectureOfDay }) => {
  const [orderLecture, setOrderLecture] = useState([]);

  useEffect(() => {
    console.log(lectureOfDay);
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

  return (
    <DayTimeTableWrapper>
      <div>2024년 5월 9일</div>
      {timeSlot.map((slot, index) => (
        <HourWrapper>
          {slot.minute === 0 && (
            <>
              <Hour>
                {getAmPm(slot.hour)} ~ {slot.minute}
              </Hour>
              <HourLine />
            </>
          )}

          {orderLecture.map((lecture) => {
            const slotTime = `${slot.hour}:${slot.minute}`;
            const lectureStartTime = lecture.startTime;

            if (slotTime === lectureStartTime) {
              return (
                <LectureItem lecture={lecture} slot={lecture.diffrenceSlot} />
              );
            }

            return null;
          })}
        </HourWrapper>
      ))}
    </DayTimeTableWrapper>
  );
};

const DayTimeTableWrapper = styled(MainDiv)`
  background-color: white;
`;

const HourWrapper = styled(RowDiv)`
  /* position: relative; */
`;

const Hour = styled.div`
  font-size: 10px;
  font-weight: 400;
  width: 55px;
  height: 5.75vh;
`;

const HourLine = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  /* margin-top: 6px; */
`;

export default DayTimeTable;
