// import React, { useEffect, useState } from "react";
// import styled, { ThemeProvider } from "styled-components";
// import DayTimeTable from "../../../components/Lecture/DayTimeTable";
// import { theme } from "../../../style/theme";

// const MonthCalendar = ({
//   currentDate,
//   lectures,
//   isHighlight,
//   setIsHighlight,
// }) => {
//   const [days, setDays] = useState([]);
//   const [filteredLectures, setFilteredLectures] = useState([]);
//   const [lectureOfDay, setLectureOfDay] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
//   const teacherList = [
//     { name: "김삼유", color: "#95C25C" },
//     { name: "장영해", color: "#D8CD63" },
//     { name: "전재우", color: "#BCD7EA" },
//   ];

//   useEffect(() => {
//     const year = currentDate.getFullYear();
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
//     const day = currentDate.getDate().toString().padStart(2, "0");

//     setIsHighlight({
//       year: year,
//       month: month,
//       day: day,
//       isHighlight: true,
//     });

//     renderCalendar();
//     filterLecturesByDay();
//   }, [currentDate, lectures]);

//   useEffect(() => {
//     if (isModalOpen) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [isModalOpen, isHighlight]);

//   const renderCalendar = () => {
//     const days = [];
//     const totalDays = daysInMonth(currentDate);
//     const startDay = getFirstDayOfWeek(currentDate);
//     const totalCells = 35;

//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();

//     addPreviousMonthDays(days, currentYear, currentMonth, startDay);
//     addCurrentMonthDays(days, currentYear, currentMonth, totalDays);
//     addNextMonthDays(days, currentYear, currentMonth, totalCells);

//     setDays(days);
//   };

//   const addPreviousMonthDays = (days, currentYear, currentMonth, startDay) => {
//     const prevMonth = new Date(currentYear, currentMonth, 0);
//     const prevMonthTotalDays = prevMonth.getDate();

//     for (
//       let i = prevMonthTotalDays - startDay + 1;
//       i <= prevMonthTotalDays;
//       i++
//     ) {
//       const year = currentMonth === 0 ? currentYear - 1 : currentYear;
//       const month =
//         prevMonth.getMonth() + 1 < 10
//           ? `0${prevMonth.getMonth() + 1}`
//           : `${prevMonth.getMonth() + 1}`;
//       console.log("prevMonth: ", month);
//       const day = i < 10 ? `0${i}` : `${i}`;

//       days.push({
//         year: year,
//         month: month,
//         day: day,
//         color: "gray_005",
//       });
//     }
//   };

//   const addCurrentMonthDays = (days, currentYear, currentMonth, totalDays) => {
//     for (let i = 1; i <= totalDays; i++) {
//       const year = currentMonth === 0 ? currentYear - 1 : currentYear;
//       const month =
//         currentMonth < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
//       console.log("currentMonth: ", month);
//       const day = i < 10 ? `0${i}` : `${i}`;

//       days.push({
//         year: year,
//         month: month,
//         day: day,
//         color: "black",
//       });
//     }
//   };

//   const addNextMonthDays = (days, currentYear, currentMonth, totalCells) => {
//     const nextMonth = new Date(currentYear, currentMonth + 1, 0);
//     const remainingCells = totalCells - days.length;
//     for (let i = 1; i <= remainingCells; i++) {
//       const year = currentMonth === 0 ? currentYear - 1 : currentYear;
//       const month =
//         nextMonth + 1 < 10 ? `0${nextMonth + 1}` : `${nextMonth + 1}`;
//       const day = i < 10 ? `0${i}` : `${i}`;

//       days.push({
//         year: year,
//         month: month,
//         day: day,
//         color: "gray_005",
//       });
//     }
//   };

//   const daysInMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   };

//   const getFirstDayOfWeek = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   };

//   const filterLecturesByDay = () => {
//     const filteredLectures = {};

//     lectures.forEach((lecture) => {
//       const dateList = lecture.dateList;

//       dateList.forEach((date) => {
//         if (!filteredLectures[date]) {
//           filteredLectures[date] = [];
//         }
//         filteredLectures[date].push(lecture);
//       });
//     });

//     console.log("filteredLectures: ", filteredLectures);
//     setFilteredLectures(filteredLectures);
//   };

//   const filterLecturesByTeacher = (lectureList = [], teacher) => {
//     return lectureList.filter((lecture) => lecture.teacher === teacher);
//   };

//   const highlightTheDay = (dayObj, lectureOfDay) => {
//     setIsHighlight({
//       year: dayObj.year,
//       month: dayObj.month,
//       day: dayObj.day,
//       isHighlight: true,
//     });
//     setIsModalOpen(true);
//     setLectureOfDay(lectureOfDay);
//   };

//   const checkHighlightDay = (dayObj) => {
//     console.log("isHighlight: ", isHighlight);
//     console.log("dayObj: ", dayObj);

//     return (
//       isHighlight.day === dayObj.day &&
//       isHighlight.month === dayObj.month &&
//       isHighlight.year === dayObj.year &&
//       isHighlight.isHighlight
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <MonthCalendarWrapper>
//         <DayWrapper>
//           {weekDays.map((day) => (
//             <DayText>{day}</DayText>
//           ))}
//         </DayWrapper>

//         <CalendarBody>
//           {days.map((dayObj) => {
//             const dateKey = `${dayObj.year}-${dayObj.month}-${dayObj.day}`;
//             const lectureOfDay = filteredLectures[dateKey];

//             return (
//               <>
//                 <DayCell>
//                   <DateText
//                     onClick={() => highlightTheDay(dayObj, lectureOfDay)}
//                     color={dayObj.color}
//                     isHighlightDay={checkHighlightDay(dayObj)}
//                   >
//                     {dayObj.day}
//                   </DateText>
//                   {teacherList.map((teacher) => {
//                     const teacherLectures = filterLecturesByTeacher(
//                       lectureOfDay,
//                       teacher.name
//                     );

//                     return (
//                       teacherLectures.length > 0 && (
   
//                         <Lecture>
//                           <Teacher teacher={teacher}> {`${teacher.name} (${teacherLectures.length})`}</Teacher>
//                           {/* <LectureSize>
//                             수업 {teacherLectures.length}개
//                           </LectureSize> */}
//                         </Lecture>

//                       )
//                     );
//                   })}
//                 </DayCell>
//               </>
//             );
//           })}
//         </CalendarBody>
//       </MonthCalendarWrapper>

//       {isModalOpen && (
//         <DayTimeTableWrapper>
//           <DayTimeTable
//             currentDate={currentDate}
//             setIsModalOpen={setIsModalOpen}
//             lectureOfDay={lectureOfDay ? lectureOfDay : []}
//             isHighlight={isHighlight}
//           />
//         </DayTimeTableWrapper>
//       )}
//     </ThemeProvider>
//   );
// };

// const MonthCalendarWrapper = styled.div`
//   width: 95%;
//   align-items: flex-start;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   margin-right: 7%;
// `;

// const CalendarBody = styled.div`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   margin-bottom: 150px;
// `;

// const DayCell = styled.div`
//   width: calc(100% / 7);
//   aspect-ratio: 1;
//   gap: 3px;
//   padding-bottom: calc(100% / 7);
//   border: 1px solid #ddd;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   justify-content: flex-start;
//   box-sizing: border-box;
//   position: relative;
//   overflow: hidden;
// `;

// const DayWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   box-sizing: border-box;
// `;

// const DayText = styled.div`
//   flex: 1;
//   text-align: center;
//   font-size: 20px;
//   font-weight: 500;
// `;

// const DateText = styled.div`
//   cursor: pointer;
//   margin-top: 3%;
//   margin-bottom: 3%;
//   font-size: ${(props) => props.theme.fontSizes.bodyText4};
//   font-weight: 400;
//   width: 33px;
//   height: 33px;
//   border-radius: 50%;
//   text-align: center;
//   line-height: 30px;
//   box-sizing: border-box;

//   color: ${({ color, theme }) =>
//     color === "gray_005" ? "#BABABA" : theme.colors.black};

//   ${({ isHighlightDay, theme }) =>
//     isHighlightDay &&
//     `
//       color: ${theme.colors.primary_normal};
//       border-color: ${theme.colors.primary_normal};
//       box-shadow: 0 0 0 1px inset;
//     `}

//   &:hover {
//     color: ${({ theme }) => theme.colors.black};
//     background-color: ${({ theme }) => theme.colors.gray_001};
//   }
    
//   &:active {
//     color: ${({ theme }) => theme.colors.white};
//     background-color: ${({theme}) => theme.colors.primary_normal };
//   }
// `;

// const Lecture = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Teacher = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100px;
//   height: 25px;
//   padding: 15px;
//   box-sizing: border-box;
//   font-size: ${(props) => props.theme.fontSizes.bodyText3};
//   color: ${(props) => props.theme.colors.white};
//   border-radius: 100px;
//   white-space: nowrap;
//   background-color: ${({ teacher }) => {
//     switch (teacher.name) {
//       case "김삼유":
//         return "#95C25C";
//       case "장영해":
//         return "#D8CD63";
//       case "전재우":
//         return "#BCD7EA";
//       default:
//         return "#95C25C";
//     }
//   }};
// `;

// const LectureSize = styled.div`
//   font-size: ${(props) => props.theme.fontSizes.bodyText3};
// `;

// const DayTimeTableWrapper = styled.div`
//   position: absolute;
//   top: 115px;
//   left: ${({ isModalOpen }) => (isModalOpen ? "25vw" : "100vw")};
//   width: 50%;
//   height: 140vh;
//   transition: left 0.5s ease-in-out;
//   transform: ${({ isModalOpen }) =>
//     isModalOpen ? "translateX(-50vw)" : "translateX(-100%)"};
//   background-color: ${(props) => props.theme.colors.white};
//   box-shadow: 0px 4px 4px 0px #00000040;
// `;

// export default MonthCalendar;
