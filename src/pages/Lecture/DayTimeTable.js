import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ColumnDiv, MainDiv, RowDiv } from "../../style/CommonStyle";
import { getAmPm } from "../../util/Util";
import LectureItem from "./LecutreItem";

const DayTimeTable = ({ filteredLectures }) => {
  const [orderLecture, setOrderLecture] = useState([]);

  useEffect(() => {
    console.log(filteredLectures);
    orderLectureByTime(filteredLectures);
  }, [filteredLectures]);

  const timeSlot = [];
  for (let hour = 7; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      timeSlot.push({ hour, minute });
    }
  }

  const orderLectureByTime = (filteredLectures) => {
    let orderLecture = [];

    let foundFirst = false; // 최초 1개를 찾았는지 여부를 나타내는 변수

    Object.keys(filteredLectures).forEach((dateKey) => {
      if (foundFirst) return; // 이미 최초 1개를 찾았다면 반복 중지

      filteredLectures[dateKey].forEach((lecture) => {
        if (foundFirst) return; // 이미 최초 1개를 찾았다면 반복 중지

        const startTime = lecture.startTime;
        const [startHour, startMinute] = startTime.split(":");
        const endTime = lecture.endTime;
        const [endHour, endMinute] = endTime.split(":");

        let totalStartMinute = parseInt(startHour) * 60 + parseInt(startMinute);
        let totalEndMinute = parseInt(endHour) * 60 + parseInt(endMinute);
        let differenceMinutes = totalEndMinute - totalStartMinute;
        let diffrenceSlot = differenceMinutes / 5;

        orderLecture.push({
          ...lecture,
          diffrenceSlot,
        });

        foundFirst = true; // 최초 1개를 찾았음을 표시
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

          {orderLecture.map((lecture, idx) => {
            const slotTime = `${slot.hour}:${slot.minute}`;
            const lectureStartTime = lecture.startTime;

            if (slotTime === lectureStartTime) {
              return (
                // <Lecture key={idx} slot={lecture.diffrenceSlot}>
                // </Lecture>
                  <LectureItem lecture={lecture} slot={lecture.diffrenceSlot} />
              );
            }

            return null; // 조건에 맞지 않으면 null 반환
          })}
        </HourWrapper>
      ))}
    </DayTimeTableWrapper>
  );
};

const DayTimeTableWrapper = styled(MainDiv)`
  width: 50vw;
  border: 1px solid #ddd;
`;

const HourWrapper = styled(RowDiv)`
  position: relative;
`;

const Hour = styled.div`
  font-size: 10px;
  font-weight: 400;
  width: 55px;
  height: 50px;
`;

const HourLine = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  margin-top: 6px;
`;

const Lecture = styled.div`
  width: 80%;
  height: ${(props) => (props.slot * 50) / 12}px;
  border: 1px solid blueviolet;
  z-index: 1;
  margin-left: 55px;
  position: absolute;
`;

export default DayTimeTable;
