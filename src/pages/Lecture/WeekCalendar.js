import React, { useEffect } from "react";
import styled from "styled-components";
import { MainDiv, RowDiv, ColumnDiv } from "../../style/CommonStyle";

const Calendar = ({ currentDate, lectures }) => {
  const hourList = Array.from({ length: 17 }, (_, i) => 7 + i); // 7 AM to 11 PM
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    renderLectures();
  }, []);

  const renderLectures = () => {
    let lectureList = lectures;

    // 요일, 시간, 분 단위로 강의 시간을 표시할 배열을 강의명을 저장할 수 있도록 변경
    const lectureSlots = Array.from({ length: 7 }, () =>
      Array.from({ length: 24 }, () => Array.from({ length: 12 }, () => null))
    );

    for (let i = 0; i < lectureList.length; i++) {
      const startTime = lectureList[i].startTime;
      const startHour = parseInt(startTime.split(":")[0]);
      const startMinute = parseInt(startTime.split(":")[1]);

      const endTime = lectureList[i].endTime;
      const endHour = parseInt(endTime.split(":")[0]);
      const endMinute = parseInt(endTime.split(":")[1]);

      // 강의명을 한번만 표시하기 위해 flag를 사용
      let isLectureNameDisplayed = false;

      // 시작 시간부터 종료 시간까지의 강의 시간에 강의명을 저장
      for (let hour = startHour; hour <= endHour; hour++) {
        const startSegment =
          hour === startHour ? Math.ceil(startMinute / 5) : 0;
        const endSegment = hour === endHour ? Math.floor(endMinute / 5) : 11;

        for (let segment = startSegment; segment <= endSegment; segment++) {
          if (!isLectureNameDisplayed) {
            // 강의명을 한번만 표시
            lectureSlots[i][hour][segment] = {
              ...lectureList[i],
              showName: true,
            };
            isLectureNameDisplayed = true;
          } else {
            lectureSlots[i][hour][segment] = {
              ...lectureList[i],
              showName: false,
            };
          }
        }
      }
    }

    // 강의 시간에 따라 캘린더에 강의명을 표시
    return (
      <>
        {dayList.map((_, dayIndex) => (
          <DayColumn key={dayIndex}>
            {hourList.map((hour, hourIndex) => (
              <HourRow key={hourIndex}>
                {Array.from({ length: 12 }, (_, segmentIndex) => {
                  // 현재 시간대의 강의 정보를 변수로 할당
                  const currentLecture =
                    lectureSlots[dayIndex][hour][segmentIndex];

                  return (
                    <MinuteSegment
                      key={segmentIndex}
                      teacher={currentLecture ? currentLecture.teacher : ""}
                    >
                      {currentLecture && currentLecture.showName ? (
                        <>
                          <LectureTime>
                            {getTime(currentLecture.startTime)}
                          </LectureTime>
                          <LectureName>{currentLecture.name}</LectureName>
                        </>
                      ) : (
                        ""
                      )}
                    </MinuteSegment>
                  );
                })}
              </HourRow>
            ))}
          </DayColumn>
        ))}
      </>
    );
  };

  const getHour = (hour) => {
    const isAM = hour < 12;
    const formattedHour = isAM ? hour : hour - 12;
    const period = isAM ? "오전" : "오후";
    const displayHour = formattedHour === 0 ? 12 : formattedHour;

    return `${period} ${displayHour}시`;
  };

  // 오전 오후 시간 반환
  const getTime = (time) => {
    // time이 문자열이 아닐 경우 문자열로 변환
    if (typeof time !== "string") {
      time = String(time);
    }

    const [hour, minute] = time.split(":").map(Number);
    const isAM = hour < 12;
    const formattedHour = isAM ? hour : hour - 12;
    const period = isAM ? "오전" : "오후";
    const displayHour = formattedHour === 0 ? 12 : formattedHour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    return `${period} ${displayHour}시 ${formattedMinute}분`;
  };

  // 요일을 받아서 해당 요일의 날짜를 반환
  const getDay = (day) => {
    const dayIndex = dayList.indexOf(day);
    if (dayIndex === -1) {
      return;
    }

    const current = new Date(currentDate);
    const diff = dayIndex - current.getDay();

    const targetDate = new Date(current);
    targetDate.setDate(current.getDate() + diff);

    return targetDate.getDate();
  };

  return (
    <WeekCalendarContainer>
      {/* 주간 캘린더 헤더 */}
      <WeekCalendarHeader>
        {dayList.map((day, index) => (
          <HeaderCell key={index}>
            <DayText>{day}</DayText>
            <DateText> {getDay(day)}</DateText>
          </HeaderCell>
        ))}
      </WeekCalendarHeader>
      <RowDiv>
        {/* 시간축 */}
        <TimeAxis>
          {hourList.map((hour, index) => (
            <>
              <TimeCell key={index}>{getHour(hour)}</TimeCell>
            </>
          ))}
        </TimeAxis>
        {/* 주간 캘린더 바디 */}
        <WeekCalendarBody>{renderLectures()}</WeekCalendarBody>
      </RowDiv>
    </WeekCalendarContainer>
  );
};

const WeekCalendarContainer = styled(MainDiv)`
  width: 90%;
`;

const WeekCalendarHeader = styled(RowDiv)`
  width: 93%;
  justify-content: space-between;
  padding: 0 5% 0 5%;
`;

const HeaderCell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const DayText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
`;

const DateText = styled.div`
  font-size: ${(props) => props.theme.fontSizes.title2};
`;

const TimeAxis = styled(ColumnDiv)`
  width: 6%;
`;

const TimeCell = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => props.theme.fontSizes.bodyText5};
`;

const WeekCalendarBody = styled(RowDiv)`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const DayColumn = styled(ColumnDiv)`
  border: 1px solid black;
`;

const HourRow = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
`;

const MinuteSegment = styled.div`
  width: 100%;
  height: 4px;
  box-sizing: border-box;

  background-color: ${({ teacher, theme }) => {
    switch (teacher) {
      case "선생님1":
        return `${theme.colors.prof_kim}70`; // 김삼유 강사일 때
      case "선생님2":
        return `${theme.colors.prof_hong}70`; // 홍길동 강사일 때
      case "선생님3":
        return `${theme.colors.prof_lee}70`; // 김수지 강사일 때
      default:
        return "rgba(255, 255, 255, 0.7)"; // 기본 색상
    }
  }};
`;

const LectureTime = styled.div`
  font-size: 13px;
  font-weight: 400;
`;

const LectureName = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

export default Calendar;
