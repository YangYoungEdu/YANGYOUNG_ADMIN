//일정 데이터 get
export const getSchedule = (startDate, endDate, schedule) => {
	if (schedule.length === 0) return [];

	const start = schedule[0].curDate.getTime();
	const end = schedule[schedule.length - 1].curDate.getTime();
	if (endDate.getTime() < start) return [];
	else if (startDate.getTime() > end) return [];

	const newSchedule = [];
	for (let i = 0; i < schedule.length; i++) {
		const curDate = schedule[i].curDate.getTime();
		if (startDate.getTime() <= curDate && endDate.getTime() >= curDate) {
			newSchedule.push(schedule[i]);
		} else if (newSchedule.length !== 0) {
			break;
		}
	}

	return newSchedule;
};

//일정 데이터 충돌확인
export const isConflict = (curDate, startTime, endTime, schedule) => {
	for (let i = 0; i < schedule.length; i++) {
			const { curDate: scheduleDate, startTime: scheduleStart, endTime: scheduleEnd } = schedule[i];

			// 동일 날짜인 경우에만 충돌 확인
			if (curDate.getTime() === scheduleDate.getTime()) {
					// 충돌 여부를 확인
					const isStartBeforeExistingEnd = 
							(startTime.hour < scheduleEnd.hour) || 
							(startTime.hour === scheduleEnd.hour && startTime.minute < scheduleEnd.minute) ||
							(startTime.hour === scheduleEnd.hour && startTime.minute === scheduleEnd.minute && startTime.second < scheduleEnd.second);

					const isEndAfterExistingStart = 
							(endTime.hour > scheduleStart.hour) || 
							(endTime.hour === scheduleStart.hour && endTime.minute > scheduleStart.minute) ||
							(endTime.hour === scheduleStart.hour && endTime.minute === scheduleStart.minute && endTime.second > scheduleStart.second);

					// if (isStartBeforeExistingEnd && isEndAfterExistingStart) {
					// 		return -1; // 충돌 발생
					// }
			}
	}

	return schedule.length; // 충돌이 없으므로 배열 끝 인덱스 반환
};

//일정 데이터 add
export const insertDate = (addFormState, schedule) => {
	const { lectureCode,name, room, teacher, curDate, startTime, endTime, lectureDateList,lectureDayList, studentList } = addFormState;
	const index = isConflict(curDate, startTime, endTime, schedule);

	if (index !== -1) {
		const newItem = { lectureCode, name, room, teacher,  curDate, startTime, endTime,lectureDateList, lectureDayList, studentList };
		return [ ...schedule.slice(0, index), newItem, ...schedule.slice(index) ];	
	} else {
		return false;
	}
};

//일정 데이터 patch -id로 구분 필요
export const editDate = (addFormState, beforeEdit, schedule) => {
	const { lectureCode, name, room, teacher, curDate, startTime, endTime , lectureDateList, lectureDayList, studentList} = addFormState;

	// 이전 할일을 지우고
	const newSchedule = deleteDate(beforeEdit.curDate, beforeEdit.startTime, beforeEdit.endTime, beforeEdit.name, schedule);

	// 새 할일을 추가하는데
	const index = isConflict(curDate, startTime, endTime, newSchedule);
	if (index !== -1) {
		// 추가에 성공
		const newItem = { lectureCode,name, room, teacher, curDate, startTime, endTime , lectureDateList, lectureDayList, studentList};
		console.log('edit', newItem);
		return [ ...newSchedule.slice(0, index), newItem, ...newSchedule.slice(index) ];
	} else {
		// 추가하려는 곳이 중복이면 작업 취소
		return false;
	}
};

//일정 데이터 delete -id로 구분 필요
export const deleteDate = (curDate, startTime, endTime, name, schedule) => {
	// 기존 schedule에서 curDate, startTime, endTime와 일치하는 항목을 찾아서 삭제
	return schedule.filter(
			(item) =>
					!(item.curDate.getTime() === curDate.getTime() &&
						item.startTime.hour === startTime.hour &&
						item.startTime.minute === startTime.minute &&
						item.endTime.hour === endTime.hour &&
						item.endTime.minute === endTime.minute&&
						item.name === name //id
					)
	);
};

