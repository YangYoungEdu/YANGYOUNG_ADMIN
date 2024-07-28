import { postLecture } from "../../../API/LectureAPI";

//일정 데이터 get
export const getSchedule = (startDate, endDate, schedule) => {
	if (schedule.length === 0) return [];

	const fistSchedule = new Date(schedule[0].lectureDate).setHours(0,0,0,0);
	const lastSchedule = new Date(schedule[schedule.length - 1].lectureDate).setHours(0,0,0,0);

	const start = fistSchedule
	const end = lastSchedule.lectureDate
	if (endDate.getTime() < start) return [];
	else if (startDate.getTime() > end) return [];

	const newSchedule = [];
	for (let i = 0; i < schedule.length; i++) {
		const curDate = new Date(schedule[i].lectureDate).setHours(0,0,0,0);
		if (startDate.getTime() <= curDate && endDate.getTime() >= curDate) {
			newSchedule.push(schedule[i]);
			// console.log("e", schedule[i]);
		} else if (newSchedule.length !== 0) {
			break;
		}
	}

	return newSchedule;
};

//일정 데이터 충돌확인
export const isConflict = (curDate, startTime, endTime, schedule) => {

	return schedule.length; // 충돌이 없으므로 배열 끝 인덱스 반환
};

//일정 데이터 add
export const insertDateAPI = async(addFormState) => {
	const { name, room, lectureType, teacher, startTime, endTime, lectureDateList, studentList } = addFormState;

	//서버에 시간 보내는 형식 변경
	const formatTime = (hour, minute) => {
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}:00`;
  };

  const startTimeStr = formatTime(startTime.hour, startTime.minute);
  const endTimeStr = formatTime(endTime.hour, endTime.minute);

	const data ={
		name: name,
		lectureType: lectureType,
		teacher: teacher,
		room: room,
		startTime: startTimeStr,
		endTime:endTimeStr,
		lectureDateList: lectureDateList,
		studentList: studentList
	}

	console.log("post 보내는 데이터 확인", data);
	const response =await postLecture(data);

	return response;
};

// ------- 위에는 수정함

//일정 데이터 patch -id로 구분 필요
export const editDate = (addFormState, beforeEdit, schedule) => {
	const { name, room,lectureType, teacher, curDate, startTime, endTime , lectureDateList, studentList} = addFormState;

	// 이전 할일을 지우고
	const newSchedule = deleteDate(beforeEdit.curDate, beforeEdit.startTime, beforeEdit.endTime, beforeEdit.name, schedule);

	// 새 할일을 추가하는데
	const index = isConflict(curDate, startTime, endTime, newSchedule);
	if (index !== -1) {
		// 추가에 성공
		const newItem = { name, room, lectureType, teacher, curDate, startTime, endTime , lectureDateList, studentList};
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

