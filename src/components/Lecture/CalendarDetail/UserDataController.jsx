import { patchDateLecture, patchDragNDrop, patchLecture, postLecture } from "../../../API/LectureAPI";

	//서버에 시간 보내는 형식 변경
export const serverformatTime = (hour, minute) => {
		const formattedHour = String(hour).padStart(2, '0');
		const formattedMinute = String(minute).padStart(2, '0');
		return `${formattedHour}:${formattedMinute}:00`;
	};


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
export const isConflict = (lectureDate, startTime, endTime, schedule) => {

	return schedule.length; // 충돌이 없으므로 배열 끝 인덱스 반환
};

//일정 데이터 add
export const insertDateAPI = async(addFormState) => {
	try{
		const { name, room, lectureType, teacher, startTime, endTime, lectureDateList, studentList } = addFormState;

		const startTimeStr = serverformatTime(startTime.hour, startTime.minute);
		const endTimeStr = serverformatTime(endTime.hour, endTime.minute);

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
		console.log("post 서버로부터 받는 데이터 확인", response);

		return response;
	}
	catch(err){
		console.error(err);
	}
};

//드래그앤 드랍
export const DragNDropPatchAPI = async (data) =>{

	try{
		console.log('강의 수업 날짜 수정', data);
		const response =await patchDragNDrop(data);
		console.log('수정한 데이터 드래그앤 드랍', response);
		return response;
	}
	catch(err){
		console.error(err);
	}

}

// ------- 위에는 수정함

//일정 데이터 patch -id로 구분 필요
export const editDateAPI = async (addFormState, beforeEdit, schedule) => {
	try{
		const { id, lectureCode, name, lectureType, teacher, room, startTime, endTime , lectureDate} = addFormState;

		// 이전 할일을 지우고
		const newSchedule = deleteDate(beforeEdit.id, schedule);

		// 새 할일을 추가하는데
		const index = isConflict(lectureDate, startTime, endTime, newSchedule);
			
		//날짜 형식 변경
		const newDateForm = lectureDate.toLocaleDateString("en-CA");

		const startTimeStr = serverformatTime(startTime.hour, startTime.minute);
		const endTimeStr = serverformatTime(endTime.hour, endTime.minute);

		const data ={
			id: id,
			name: name,
			teacher: teacher,
			room: room,
			startTime: startTimeStr,
			endTime:endTimeStr,
			newLecturerDate: newDateForm,
			allUpdate: false
		}

		// console.log('수정할 데이터', data);
		const response =await patchLecture(data);
		// console.log('수정한 데이터', response);

		return [ ...newSchedule.slice(0, index), response, ...newSchedule.slice(index) ];
	}
	catch(err){
		console.error(err);
	}
};

//일정 데이터 delete -id로 구분 필요
export const deleteDate = (id, schedule) => {
	// 기존 schedule에서 id와 일치하는 항목을 찾아서 삭제
	return schedule.filter(
			(item) =>
					!(
						item.id === id //id
					)
	);
};

