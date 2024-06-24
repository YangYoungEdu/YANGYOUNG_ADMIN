import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WeekCalendar = ({ currentDate, lectures }) => {
  // 요일을 표시하는 배열 (일, 월, 화, 수, 목, 금, 토)
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  // 상태로 필터링된 강의 목록을 저장하는 상태 훅
  const [filteredLectures, setFilteredLectures] = useState({});

  // 컴포넌트가 마운트되거나 currentDate 또는 lectures 상태가 변경될 때 실행되는 useEffect 훅
  useEffect(() => {
    // 날짜와 시간에 따라 강의를 필터링하는 함수
    const filterLecturesByDateAndTime = () => {
      const filtered = {};

      // 날짜를 받아 요일을 반환하는 함수
      const getDayOfWeek = (date) => {
        const dayOfWeek = new Date(date).getDay();
        return ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
      };

      // 특정 날짜에 해당하는 강의들을 반환하는 함수
      const getLecturesByDate = (lectures, date) => {
        return lectures.filter((lecture) => lecture.dateList.includes(date));
      };

      // 현재 날짜를 기준으로 7일간의 강의를 필터링
      for (let i = 0; i <= 6; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        const dayOfWeek = getDayOfWeek(date);
        filtered[dayOfWeek] = getLecturesByDate(
          lectures,
          date.toISOString().slice(0, 10)
        );
      }

      return filtered;
    };

    // 필터링된 강의 목록을 상태에 저장
    setFilteredLectures(filterLecturesByDateAndTime(lectures, currentDate));
  }, [currentDate, lectures]);

  // 시간을 오전/오후 형식으로 변환하는 함수
  const getHour = (hour) => {
    if (hour < 7) return `오전 ${hour + 12}:00`;
    if (hour < 12) return `오전 ${hour}:00`;
    if (hour === 12) return `오후 ${hour}:00`;
    return `오후 ${hour - 12}:00`;
  };

  // 주어진 날짜와 인덱스를 기준으로 날짜를 반환하는 함수
  const getDayDate = (currentDate, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + index);
    return date.getDate().toString().padStart(2, "0");
  };

  // 특정 요일과 시간, 쿼터 시간(15분 단위)에 해당하는 강의들을 렌더링하는 함수
  const renderLecturesByQuarterHour = (dayOfWeek, hour, quarter) => {
    if (filteredLectures[dayOfWeek]) {
      // 강의들을 시작 시간 순으로 정렬
      const sortedLectures = filteredLectures[dayOfWeek].sort((a, b) => {
        const startTimeA = a.startTime;
        const startTimeB = b.startTime;
        return startTimeA - startTimeB;
      });
      console.log("sortedLectures: ", sortedLectures);

      return sortedLectures.map((lecture, index) => {
        const startTime = lecture.startTime;
        const startHour = startTime.split(":")[0];
        const startMinute = startTime.split(":")[1];
        const startQuarter = Math.floor(startMinute / 15);
        const endTime = lecture.endTime;
        const endHour = endTime.split(":")[0];
        const endMinute = endTime.split(":")[1];
        const endQuarter = Math.ceil(endMinute / 15);

        // 현재 시간과 쿼터 시간에 해당하는 강의가 있으면 렌더링
        if (
          startHour === hour &&
          startQuarter <= quarter &&
          (endHour > hour || (endHour === hour && endQuarter > quarter))
        ) {
          return (
            <QuarterHourCell key={index} hasLecture={true}>
              {lecture.name}
            </QuarterHourCell>
          );
        }

        // 강의가 시간 내에 걸쳐 있을 경우 렌더링
        if (startHour < hour && endHour > hour) {
          return (
            <QuarterHourCell key={index} hasLecture={true}>
              {lecture.name}
            </QuarterHourCell>
          );
        }

        // 강의가 현재 시간의 마지막 쿼터 시간에 걸쳐 있을 경우 렌더링
        if (endHour === hour && endQuarter > quarter) {
          return (
            <QuarterHourCell key={index} hasLecture={true}>
              {lecture.name}
            </QuarterHourCell>
          );
        }

        // 해당 시간에 강의가 없으면 null 반환
        return null;
      });
    }
    // 해당 요일에 강의가 없으면 null 반환
    return null;
  };

  return (
    <CalendarContainer>
      <WeekRow>
        <EmptyCell></EmptyCell>
        {daysOfWeek.map((day, index) => (
          <DayCell key={index}>
            <DayText>{day}</DayText>
            <DateText>{getDayDate(currentDate, index)}</DateText>
          </DayCell>
        ))}
      </WeekRow>

      {[...Array(17).keys()].map((hour) => (
        <WeekRow key={hour}>
          <HourText>{getHour(hour + 7)}</HourText>
          {daysOfWeek.map((day, index) => (
            <HourCell key={index}>
              {/* 하루에 할당 되는 수업 매핑 - 동시간대 4개까지 보임 */}
              {[...Array(4).keys()].map((quarter) => (
                <QuarterHourCell key={quarter}>
                  {renderLecturesByQuarterHour(
                    daysOfWeek[index],
                    hour + 7,
                    quarter
                  )}
                </QuarterHourCell>
              ))}
            </HourCell>
          ))}
        </WeekRow>
      ))}
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const DayText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
`;

const DateText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
`;

const EmptyCell = styled.div`
  width: 14%;
  height: 50px;
`;

const DayCell = styled.div`
  width: calc(100% / 7);
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  `;

const HourCell = styled.div`
  flex: 1;
  height: 50px;
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.hasLecture ? "skyblue" : "transparent"};

`;

const HourText = styled(HourCell)`
  font-size: ${(props) => props.theme.fontSizes.bodyText5};
  border: none;
  align-items: flex-start;
  margin-top: -4px;
`;

const QuarterHourCell = styled.div`
  flex: 1;
  /* border: 1px solid #ddd; */
  background-color: ${({ hasLecture }) => (hasLecture ? "#e3f2fd" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default WeekCalendar;
