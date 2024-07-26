import React, { useState, useEffect } from 'react';
// import '../../style/css/app.css';
import { editDate } from './UserDataController';
import { useAddFormState } from '../../stores/addFormState';
import { useErrorState } from '../../stores/errorState';
import { useUserData } from '../../stores/userData';
import { useDragAndDrop } from '../../stores/dragAndDrop';
import styled from 'styled-components';

const MonthlyCell = ({ date, schedule, isSelected, onClick }) => {
  //   const { date, schedule } = props;
  const [addFormState, setAddFormState] = useAddFormState();
  const { active } = addFormState;
  const [errorState, setErrorState] = useErrorState();
  const [userData, setUserData] = useUserData();
  const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
  const [curDateStr, setCurDateStr] = useState("");
  //   const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    let newCurDateStr = date.getDate();
    if (schedule.length !== 0) {
      newCurDateStr += " (" + schedule.length + ")";
    }
    setCurDateStr(newCurDateStr);
  }, [schedule]);

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
				lectureCode: '',
				name: '',
				room: '',
				teacher: '',
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
				studentList: []
			});
		}
	};
	

	//일정 클릭 후 수정
	const onClickSchedule = (e, schedule) => {
		e.stopPropagation();
		const { lectureCode, name, room, teacher, curDate, startTime, endTime, studentList } = schedule;

		if (!active) {
			setAddFormState({
				...addFormState,
				active: true,
				mode: 'edit',
				lectureCode: lectureCode,
				name: name,
				room: room,
				teacher: teacher,
				curDate: curDate,
				startTime: { ...startTime}, // 새로운 시간 형식 적용
				endTime: { ... endTime},
				studentList: studentList
			});
		}
	};

  const onDropSchedule = (e) => {
    console.log("드로그", e);

    const newSchedule = editDate(
      dragAndDrop.to,
      dragAndDrop.from,
      userData.schedule
    );

		if (newSchedule !== false) {
			setUserData({ ...userData, schedule: newSchedule });
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [ [ '일정이 수정 되었습니다.' ] ]
			});
		} else {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [ [ '일정을 수정할 수 없습니다.' ], [ '해당 시간에 이미 다른 일정이 존재합니다.' ] ]
			});
		}
	};

  const onDragCell = (e, schedule) => {
    console.log("드로그", e);
    setDragAndDrop({ ...dragAndDrop, from: schedule });
  };

	const onDragEnterCell = (e) => {
		const { lectureCode,name, room, teacher, startTime, endTime , studentList} = dragAndDrop.from;
		const newScheduleForm = { lectureCode: lectureCode, name:name, room:room, teacher:teacher, curDate: date, startTime: { ... startTime}, endTime: { ... endTime}, studentList:studentList };
		setDragAndDrop({ ...dragAndDrop, to: newScheduleForm });
	};

  return (
    <MonthlyCellContainer
      // className="monthly-cell"
      onClick={onClickDate}
      //   onClick = {onClick}
      onDragEnter={onDragEnterCell}
      onDragEnd={onDropSchedule}
    >
      <DateText isSelected={isSelected}>{curDateStr}</DateText>

			{schedule.map((a, i) => (
				<MonthlyCellDiv
					key={i}
					// className="monthly-schedule"
					onClick={(e) => onClickSchedule(e, a)}
					draggable
					onDragStart={(e) => onDragCell(e, a)}
				>
					<p>{a.startTime.hour+':'+a.startTime.minute+'~'+a.endTime.hour+':'+a.endTime.minute}</p>
					<p>{a.name}</p>
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

  cursor: pointer;
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

  width: 20%;
  height: 21.9%;

  z-index: 3;
  position: sticky;
  top: 0;

  border-radius: 50%;

  font-weight: 400;
  font-size: 12px;

  &:hover {
    box-shadow: inset 0 0 0 1px #15521d;
  }
  background-color: ${({ isSelected }) => (isSelected ? "#15521d" : "inherit")};
  color: ${({ isSelected }) => (isSelected ? "white" : "inherit")};
`;

const MonthlyCellDiv = styled.div`
  padding: 5px;
  font-size: 12px;
  /* font-size: 50px; */
  background: #111;
  color: #eee;
  border-radius: 5px;
  z-index: 2;
  margin-bottom: 10px;
  cursor: grab;
  /* all: initial; */

  &:hover {
    opacity: 0.5;
  }

  & > p {
    background: #111;
    margin: 0;
  }
`;

export default MonthlyCell;
