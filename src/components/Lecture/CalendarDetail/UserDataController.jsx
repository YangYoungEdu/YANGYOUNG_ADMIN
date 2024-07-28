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
	const { name, room, teacher, startTime, endTime, lectureDateList, studentList } = addFormState;

	// const data ={
	// 	name: name,
	// 	teacher: teacher,
	// 	room: room,
	// 	startTime: startTime,
	// 	endTime: endTime,
	// 	lectureDateList: lectureDateList,
	// 	studentList: studentList
	// }

	const data ={
		name: "ㅋㅁㅇㅁㅇㅁㅇㅁㅇㅊㅍ",
		teacher: "ㅁㅇㅁㅇㅁㅇ",
		room: "ㅁㅇㅁㅇㅁㅇㅁ",
		startTime: "15:51:26",
		endTime: "15:51:27",
		lectureDateList: [
			"2024-04-19", "2024-04-12"
		],
		studentList: [2221333]
	}

	console.log("post 보내는 데이터 확인", data);
	const response =await postLecture(data);

	return response;
};

// ------- 위에는 수정함

//일정 데이터 patch -id로 구분 필요
export const editDate = (addFormState, beforeEdit, schedule) => {
	const { name, room, teacher, curDate, startTime, endTime , lectureDateList, studentList} = addFormState;

	// 이전 할일을 지우고
	const newSchedule = deleteDate(beforeEdit.curDate, beforeEdit.startTime, beforeEdit.endTime, beforeEdit.name, schedule);

	// 새 할일을 추가하는데
	const index = isConflict(curDate, startTime, endTime, newSchedule);
	if (index !== -1) {
		// 추가에 성공
		const newItem = { name, room, teacher, curDate, startTime, endTime , lectureDateList, studentList};
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

