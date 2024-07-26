import React, { useState, useEffect } from 'react';
// import '../../style/css/app.css';
import { editDate } from './UserDataController';
import { useAddFormState } from '../../stores/addFormState';
import { useErrorState } from '../../stores/errorState';
import { useUserData } from '../../stores/userData';
import { useDragAndDrop } from '../../stores/dragAndDrop';
import styled from 'styled-components';

const MonthlyCell = (props) => {
	const { date, schedule } = props;
	const [ addFormState, setAddFormState ] = useAddFormState();
	const { active } = addFormState;
	const [ errorState, setErrorState ] = useErrorState();
	const [ userData, setUserData ] = useUserData();
	const [ dragAndDrop, setDragAndDrop ] = useDragAndDrop();
	const [ curDateStr, setCurDateStr ] = useState('');

	useEffect(
		() => {
			let newCurDateStr = date.getDate();
			if (schedule.length !== 0) {
				newCurDateStr += ' (' + schedule.length + ')';
			}
			setCurDateStr(newCurDateStr);
		},
		[ schedule ]
	);

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
				lectureType: '',
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
					nano:0 } // 새로운 시간 형식 적용
			});
		}
	};
	

	//일정 클릭 후 수정
	const onClickSchedule = (e, schedule) => {
		e.stopPropagation();
		const { lectureType, teacher, curDate, startTime, endTime } = schedule;

		if (!active) {
			setAddFormState({
				...addFormState,
				active: true,
				mode: 'edit',
				lectureType: lectureType,
				teacher: teacher,
				curDate: curDate,
				startTime: { ...startTime}, // 새로운 시간 형식 적용
				endTime: { ... endTime}
			});
		}
	};

	const onDropSchedule = (e) => {
		console.log("드로그", e);

		const newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, userData.schedule);

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
		const { lectureType,teacher, startTime, endTime } = dragAndDrop.from;
		const newScheduleForm = { lectureType: lectureType, teacher:teacher, curDate: date, startTime: { ... startTime}, endTime: { ... endTime} };
		setDragAndDrop({ ...dragAndDrop, to: newScheduleForm });
	};

	return (
		<MonthlyCellContainer 
			// className="monthly-cell" 
			onClick={onClickDate} 
			onDragEnter={onDragEnterCell} 
			onDragEnd={onDropSchedule}>
			<p>{curDateStr}</p>

			{schedule.map((a, i) => (
				<MonthlyCellDiv
					key={i}
					// className="monthly-schedule"
					onClick={(e) => onClickSchedule(e, a)}
					draggable
					onDragStart={(e) => onDragCell(e, a)}
				>
					<p>{a.startTime.hour+':'+a.startTime.minute+'~'+a.endTime.hour+':'+a.endTime.minute}</p>
					<p>{a.lectureType}</p>
				</MonthlyCellDiv>
			))}
		</MonthlyCellContainer>
	);
};

const MonthlyCellContainer = styled.div`
		width: 120px;
		height: 120px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-right: solid 1px #111;
		padding: 0px;
		cursor: pointer;
		overflow: scroll;
		padding: 5px; 
	/* all: initial;; */
		/* cursor: grab;  */

  & > p {
    width: 100%;
    background: #eee;
    z-index: 3;
    position: sticky;
    top: 0;
    margin: 0;
  }

  &:nth-child(1) {
    border-left: solid 1px #111;
  }
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
