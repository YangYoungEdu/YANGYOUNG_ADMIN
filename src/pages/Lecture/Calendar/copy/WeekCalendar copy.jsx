// import { render } from "@testing-library/react";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const WeekCalendar = ({ currentDate, lectures }) => {
//   const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
//   const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
//   const [filteredLectures, setFilteredLectures] = useState({});
//   const weeklyCalendar = new Array(7).fill().map(() => new Array(24).fill().map(() => new Array(12).fill([])));

//   useEffect(() => {
//     setFilteredLectures(filterLecturesByDate(lectures, currentDate));
//     renderLecturesByQuarterHour();
//     setTimeout(() => {
//       console.log(weeklyCalendar);
//     }, 1000);
//   }, [lectures, currentDate]);

//   const filterLecturesByDate = (lectures, currentDate) => {
//     const filtered = {};
//     const startDate = getStartOfWeek(currentDate);
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       const dayOfWeek = getDayOfWeek(date);
//       filtered[dayOfWeek] = getLecturesByDate(lectures, date.toISOString().slice(0, 10));
//     }
//     return filtered;
//   };
// // 
//   const getStartOfWeek = (date) => {
//     const currentDate = new Date(date);
//     const day = currentDate.getDay();
//     const diff = currentDate.getDate() - day;
//     return new Date(currentDate.setDate(diff));
//   };

//   const getDayOfWeek = (date) => {
//     const dayOfWeek = new Date(date).getDay();
//     return ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];
//   };

//   const getLecturesByDate = (lectures, date) => {
//     return lectures.filter((lecture) => lecture.dateList.includes(date)).sort((a, b) => a.startTime - b.startTime);
//   };

//   const getHour = (hour) => {
//     if (hour < 7) return `오전 ${hour + 12}:00`;
//     if (hour < 12) return `오전 ${hour}:00`;
//     if (hour === 12) return `오후 ${hour}:00`;
//     return `오후 ${hour - 12}:00`;
//   };

//   const getDayDate = (currentDate, index) => {
//     const date = new Date(currentDate);
//     date.setDate(date.getDate() + index);
//     return date.getDate().toString().padStart(2, "0");
//   };

//   const renderLecturesByQuarterHour = () => {
//     dayOfWeek.forEach((day, dayIndex) => {
//       const sortedLectures = filteredLectures[day];
//       if (sortedLectures && sortedLectures.length > 0) {
//         sortedLectures.forEach((lecture) => {
//           const [startHour, startMinute] = lecture.startTime.split(":").map(Number);
//           const [endHour, endMinute] = lecture.endTime.split(":").map(Number);
//           const startMinuteIndex = Math.floor(startMinute / 5);
//           const endMinuteIndex = Math.floor(endMinute / 5);

//           for (let hour = startHour; hour <= endHour; hour++) {
//             let minuteStart = 0,
//               minuteEnd = 11;

//             if (hour === startHour) minuteStart = startMinuteIndex;
//             if (hour === endHour) minuteEnd = endMinuteIndex;

//             for (let minute = minuteStart; minute <= minuteEnd; minute++) {
//               weeklyCalendar[dayIndex][hour][minute].push(lecture);
//             }
//           }
//         });
//       }
//     });
//   };

//   return (
//     <CalendarContainer>
//       <WeekRow>
//         <EmptyCell></EmptyCell>
//         {daysOfWeek.map((day, index) => (
//           <DayCell key={index}>
//             <DayText>{day}</DayText>
//             <DateText>{getDayDate(currentDate, index)}</DateText>
//           </DayCell>
//         ))}
//       </WeekRow>

//       {[...Array(17).keys()].map((hour) => (
//         <WeekRow key={hour}>
//           <HourText>{getHour(hour + 7)}</HourText>
//           {daysOfWeek.map((day, index) => (
//             <HourCell key={index}>
//               {/* 하루에 할당 되는 수업 매핑 - 동시간대 4개까지 보임 */}
//               {/* {[...Array(4).keys()].map((quarter) => (
//                 <QuarterHourCell key={quarter}>
//                   {renderLecturesByQuarterHour(
//                     daysOfWeek[index],
//                     hour + 7,
//                     quarter
//                   )}
//                 </QuarterHourCell>
//               ))} */}
//             </HourCell>
//           ))}
//         </WeekRow>
//       ))}
//     </CalendarContainer>
//   );
// };

// const CalendarContainer = styled.div`
//   width: 90%;
//   display: flex;
//   flex-direction: column;
// `;

// const WeekRow = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const DayText = styled.div`
//   font-size: ${(props) => props.theme.fontSizes.bodyText4};
// `;

// const DateText = styled.div`
//   font-size: ${(props) => props.theme.fontSizes.title2};
// `;

// const EmptyCell = styled.div`
//   width: 14%;
//   height: 50px;
// `;

// const DayCell = styled.div`
//   width: calc(100% / 7);
//   height: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 24px;
// `;

// const HourCell = styled.div`
//   flex: 1;
//   height: 50px;
//   border-width: 1px 0 0 1px;
//   border-style: solid;
//   border-color: #ccc;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${(props) => (props.hasLecture ? "skyblue" : "transparent")};
// `;

// const HourText = styled(HourCell)`
//   font-size: ${(props) => props.theme.fontSizes.bodyText5};
//   border: none;
//   align-items: flex-start;
//   margin-top: -4px;
// `;

// const QuarterHourCell = styled.div`
//   flex: 1;
//   background-color: ${({ hasLecture }) => (hasLecture ? "#e3f2fd" : "white")};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export default WeekCalendar;
