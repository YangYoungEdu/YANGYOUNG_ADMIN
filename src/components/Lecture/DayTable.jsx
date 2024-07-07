import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MainDiv, RowDiv } from "../../style/CommonStyle";
import { getAmPm } from "../../util/Util";
import LectureItem from "./LecutreItem";
import LectureDeatil from "../../pages/Lecture/LectureDetail";

const DayTable = ({ currentDate, lectureList }) => {
  const [filteredLectureList, setFilteredLectureList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // 일간 캘린더 표시를 위한 시간 슬롯
  const timeSlot = [];
  for (let hour = 7; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      timeSlot.push({ hour, minute });
    }
  }

  // 강의 시간 오름차순 정렬 및, 강의 시간 계산
  useEffect(() => {
    const filterLectureListByTime = () => {
      let filtered = [];
      lectureList.forEach((lecture) => {
        const startTime = lecture.startTime;
        const [startHour, startMinute] = startTime.split(":");
        const endTime = lecture.endTime;
        const [endHour, endMinute] = endTime.split(":");

        let totalStartMinute = parseInt(startHour) * 60 + parseInt(startMinute);
        let totalEndMinute = parseInt(endHour) * 60 + parseInt(endMinute);
        let differenceMinutes = totalEndMinute - totalStartMinute;
        let differenceSlot = differenceMinutes / 5;

        filtered.push({
          ...lecture,
          differenceSlot,
        });
      });

      setFilteredLectureList(filtered);
    };
    filterLectureListByTime();
  }, [lectureList]);

  return (
    <>
      <DayTableWrppaer>
        {timeSlot.map((slot) => (
          <HourWrapper>
            {slot.minute === 0 && (
              <HourItem>
                <Hour>{getAmPm(slot.hour)}</Hour>
                <HourLine />
              </HourItem>
            )}

            {filteredLectureList.map((lecture) => {
              const slotTime = `${slot.hour}:${slot.minute}`;
              const lectureStartTime = lecture.startTime;

              if (slotTime === lectureStartTime) {
                return (
                  <LectureItemWrapper>
                    <LectureItem
                      setIsClicked={setIsClicked}
                      setSelectedLecture={setSelectedLecture}
                      lecture={lecture}
                      slot={lecture.diffrenceSlot}
                    />
                  </LectureItemWrapper>
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
      </DayTableWrppaer>

      {isClicked && selectedLecture && (
        // <div>{selectedLecture.name}</div>
        <LectureDeatil
          currentDate={currentDate}
          setIsClicked={setIsClicked}
          setSelectedLecture={setSelectedLecture}
          selectedLecture={selectedLecture}
        />
      )}
    </>
  );
};

const DayTableWrppaer = styled(MainDiv)`
  position: relative;
  align-items: flex-start;
  background-color: #ffffff; // ToDo: theme으로 수정
  width: 90%;
`;

const HourWrapper = styled(RowDiv)`
  position: relative;
`;

const HourItem = styled(RowDiv)`
  justify-content: flex-start;
  align-items: center;
  height: 4.5vh;
`;

const Hour = styled.div`
  font-size: 10px;
  font-weight: 400;
  width: 50px;
  margin: -7px -80px 0px 80px;
`;

const HourLine = styled.div`
  width: 80.5%;
  height: 1px;
  background-color: #ddd;
  margin-left: 80px;
`;

const LectureItemWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  z-index:1;
`;

export default DayTable;
