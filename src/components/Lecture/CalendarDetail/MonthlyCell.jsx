import React, { useState, useEffect } from 'react';
// import '../../style/css/app.css';
import { editDateAPI } from './UserDataController';
import { useAddFormState } from '../../../stores/addFormState';
import { useDragAndDrop } from '../../../stores/dragAndDrop';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getCalendarData } from '../../../Atom';
import { format } from 'date-fns';

const MonthlyCell = ({ date, schedule, isSelected, onClick }) => {
  //   const { date, schedule } = props;
  console.log('date 형식 확인 중', date);
  const [addFormState, setAddFormState] = useAddFormState();
  const { active } = addFormState;
	
	const [calSchedule, setCalSchedule] = useRecoilState(getCalendarData
  );
  const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
  const [curDateStr, setCurDateStr] = useState("");
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);

  useEffect(() => {
    let newCurDateStr = date.getDate();
    setCurDateStr(newCurDateStr);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Check if the date is in the current month
    const isInCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    setIsCurrentMonth(isInCurrentMonth);
  }, [calSchedule, schedule, date]);

	//빈 셀 클릭후 일정 추가
	const onClickDate = () => {
		if (!active) {
			const now = new Date();
			const startHour = now.getHours();
			const startMinute = now.getMinutes(); 
			const endHour = startHour + 1;
	
			console.log("빈셀", { hour: startHour, minute: startMinute });
	
			setAddFormState({
				...addFormState,
				active: true,
				mode: 'add',
				name: '',
				lectureType: '',
				teacher: '',
				room: '',
				curDate: date, // Date 객체 그대로 유지
				startTime: { 
					hour: startHour, 
					minute: startMinute, 
					second: 0, 
					nano:0 }, // 새로운 시간 형식 적용
				endTime: { 
					hour: endHour, 
					minute: startMinute, 
					second: 0, 
					nano:0 }, // 새로운 시간 형식 적용
				lectureDateList: [], //보낼때는 배열 받을 때는 string
				studentList: []
			});
		}
	};
	

	//일정 클릭 후 수정
	const onClickSchedule = (e, schedule) => {
		e.stopPropagation();
		const { name, room,lectureType, teacher, curDate, startTime, endTime,lectureDate, studentList } = schedule;
    if (!active) { // 리사이징 중일 때 클릭 방지
      setAddFormState({
          ...addFormState,
          active: true,
          mode: 'edit',
          name: name,
          room:room,
          lectureType:lectureType,
          teacher:teacher,
          curDate: curDate,
          startTime: {...startTime},
          endTime: {...endTime},
          studentList: studentList
      });
    }
  };

  // 선생님별로 일정을 그룹화
  const groupedSchedules = schedule.reduce((acc, curr) => {
    if (!acc[curr.teacher]) {
      acc[curr.teacher] = [];
    }
    acc[curr.teacher].push(curr);
    return acc;
  }, {});

  const teacherNames = Object.keys(groupedSchedules);


  return (
    <MonthlyCellContainer
      // className="monthly-cell"
      onClick={isCurrentMonth ? onClickDate : undefined} 
      isCurrentMonth={isCurrentMonth}
    >
      <DateText 
      isSelected={isSelected}
      isCurrentMonth={isCurrentMonth}
      curDateStr={curDateStr}
      >
        {curDateStr}
      </DateText>

			{teacherNames.map((teacher, i) => (
				<MonthlyCellDiv
					key={i} 
					onClick={(e) => onClickSchedule(e, groupedSchedules[teacher])}
          isCurrentMonth={isCurrentMonth}>
          <TeacherNameDiv teacher={teacher}>
            <span>{teacher}</span>
          </TeacherNameDiv>
          <CountCourseDiv>수업 {groupedSchedules[teacher].length}개</CountCourseDiv>
				</MonthlyCellDiv>
			))}
		</MonthlyCellContainer>
	);
};

const MonthlyCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 7px 12px 7px 12px;
  width: 160px;
  height: 144px;

  box-sizing: border-box;
  border-right: solid 1px #e0e0e0;
  gap: 6px;

  cursor: ${({ isCurrentMonth }) => (isCurrentMonth ? 'pointer' : 'default')};
  overflow: scroll;

  &:nth-child(1) {
    border-left: solid 1px #e0e0e0;
  }
`;

const DateText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: ${({ curDateStr }) => (curDateStr < 10? '5% 7.5%' : '5% 6.5%')};

  /* width: 20%;
  height: 21.9%; */

  z-index: 3;
  position: sticky;
  top: 0;

  border-radius: 50%;

  font-weight: 400;
  font-size: 12px;

  ${({ isCurrentMonth }) =>
    isCurrentMonth &&
    `
    &:hover {
      box-shadow: inset 0 0 0 1px #15521d;
    }
  `}
  
  background-color: ${({ isSelected, isCurrentMonth }) => (isCurrentMonth ? (isSelected ? "#15521d" : "inherit"): "inherit")};
  color: ${({ isSelected, isCurrentMonth }) => (isCurrentMonth ? (isSelected ? "white" : "inherit") : " #BABABA")};
  z-index: 3;

`;

const MonthlyCellDiv = styled.div`
  /* padding: 5px; */
  z-index: 2;
  /* margin-top: 12px; */
  display: flex;
  align-items: center;
  cursor: ${({ isCurrentMonth }) => (isCurrentMonth ? 'pointer' : 'default')};

  &:hover {
    opacity: 0.5;
  }
`;

const TeacherNameDiv = styled.div`
  display: inline-flex;
  height: 25px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background:${(props) => {
    switch (props.teacher) {
        case "김삼유":
        return "#95C25C";
        case "장영해":
        return "#D8CD63";
        case "전재우":
        return  "#BCD7EA"
        default:
        return "gray";
    }
    }};
  margin-right: 5px;
  text-align: center;

  &> span{
    color: var(--Color-Background, #FFF);
    padding: 10px;
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const CountCourseDiv =styled.span`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

`;

export default MonthlyCell;
