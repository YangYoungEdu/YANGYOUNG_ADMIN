import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
// import '../../style/css/app.css';
import { deleteDate, deleteLectureAPI, editDate, editDateAPI, insertDateAPI, serverformatTime } from '../CalendarDetail/UserDataController.jsx';
// store
import { useAddFormState } from '../../../stores/addFormState.jsx';
import { getCalendarData } from '../../../Atom.js';
import { useRecoilState } from 'recoil';
import ModalDesign from './ModalDesign.jsx';
import RepeatModal from './RepeatModal.jsx';
import { format } from 'date-fns';

//edit 관련 상태관리
const EditForm = () => {
  const [addFormState, setAddFormState] = useAddFormState();
  const { active, mode } = addFormState;
  //수정 편집 모드 관리
  const [editDisable, setEditDisable] =useState(true);
  //반복 일정시 모달창
  const [isRepeatModalOpen, setIsRepeatModalOpen] = useState(false);
  //반복 일정시 모달창 모드
  const [repeatMode, setRepeatMode] =useState("repeatEdit");
  const [calSchedule, setCalSchedule] = useRecoilState(getCalendarData);
  //반복 수정 여부 확인
  const [isAllEdit, setIsAllEdit] =useState(false);

  const [newAddFormState, setNewAddFormState] = useState({
    id: null,
    mode: 'edit',
    name: '',
    room: '',
    lectureType: '',
    teacher: '',
    curDate: new Date(), //서버에 안 들어가는 변수
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 1, minute: 0, second: 0, nano: 0 },
    lectureDateList: [],
    studentList: [],
    lectureDate:'',
    allLectureDate: [],
    repeated: false
  });
  const {startTime, endTime } = newAddFormState;

  // 학생 선택
  const [searchData, setSearchData] = useState([]);
  const [searchDataCount, setSearchDataCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState({
    nameList: [],
    schoolList: [],
    gradeList: [],
  });
  const [multidates, setmultiDates] = useState([]); //날짜 선택

  useEffect(() => {

    if (active) {
      const { id, name, room,lectureType, teacher, curDate, startTime, endTime , lectureDateList, studentList, lectureDate,allLectureDate, repeated} = addFormState;

      setNewAddFormState({
        id: id || null,
        mode: 'edit',
        name:name|| '' , 
        room: room|| '',
        lectureType: lectureType || '일반',
        teacher: teacher || '',
        curDate: curDate || new Date(),
        startTime: startTime || { hour: 0, minute: 0, second: 0, nano: 0 },
        endTime: endTime || { hour: 1, minute: 0, second: 0, nano: 0 },
        lectureDateList: lectureDateList || [],
        studentList: studentList || [],
        lectureDate: lectureDate || '',
        allLectureDate: allLectureDate || [],
        repeated: repeated || false
      });
      
    }
  }, [active, addFormState, mode, editDisable]);

  const validateTimeValue = (value, defaultValue, min, max) => {
    if (value === '') return defaultValue; // 빈칸일 경우 기본값
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) return defaultValue; // NaN일 경우 기본값
    return Math.max(min, Math.min(max, intValue)); // 유효 범위로 제한
  };
  

  const onChangeNewAddFormState = (e) => {
    const { id, value } = e.target;
    console.log('밸류', value);

    const validatedValue = value === '' ? '0' : value; 
    const intValue = parseInt(value, 10);

    const validateHour = (val) => validateTimeValue(val, 0, 0, 23);
    const validateMinute = (val) => validateTimeValue(val, 0, 0, 59);

    switch (id) {
      case 'input-name':
        setNewAddFormState({ ...newAddFormState, name: value });
        break;
      case 'lectureType-select':
        setNewAddFormState({ ...newAddFormState, lectureType: value });
        break;
      case 'input-room':
        setNewAddFormState({ ...newAddFormState, room: value });
        break;
      case 'teacher-select':
        setNewAddFormState({
          ...newAddFormState,
          teacher: value
        });
        break;
      case 'start-hour':
        setNewAddFormState({
          ...newAddFormState,
          startTime: { ...startTime, hour: validateHour(validatedValue) }
        });
        break;
      case 'start-minute':
        setNewAddFormState({
          ...newAddFormState,
          startTime: { ...startTime, minute: validateHour(validatedValue) }
        });
        break;
      case 'end-hour':
        setNewAddFormState({
          ...newAddFormState,
          endTime: { ...endTime, hour: validateHour(validatedValue) }
        });
        break;
      case 'end-minute':
        setNewAddFormState({
          ...newAddFormState,
          endTime: { ...endTime, minute: validateHour(validatedValue) }
        });
        break;

      default:
        break;
    }
  };

  const onClickCancel = (e) => {
    // e.stopPropagation();
    setAddFormState({ ...addFormState, active: false });
  };

  //수정 편집 모드
  const onClcikEditMode = (e) =>{
    //반복이고 조회
    if(addFormState.repeated&&editDisable){
      setRepeatMode("repeatEdit")
      setIsRepeatModalOpen(!isRepeatModalOpen);
      document.body.style.overflow = "hidden";
    } 
    //반복이고 수정 -취소누를 때
    else if(addFormState.repeated&&!editDisable){
      setEditDisable(!editDisable);
    }
    //단일이고 조회
    else if(!addFormState.repeated&&editDisable){
      //단일 수정
      setEditDisable(!editDisable);
    }
    //단일이고 수정 - 취소누를 때
    else{
      setEditDisable(!editDisable);
    }
    
  } 

  //끝시간이 시작시간보다 빠른지 확인
  const isEndTimeBeforeStartTime = (startTime, endTime) => {
    const startTimeInMinutes = startTime.hour * 60 + startTime.minute;
    const endTimeInMinutes = endTime.hour * 60 + endTime.minute;
    return endTimeInMinutes < startTimeInMinutes;
  };

  //수정
  const onClickEdit = async  (e) =>{
    console.log("반복 수정 여부 확인", isAllEdit);
    try{

      // 시간 비교 및 예외 처리
      if (isEndTimeBeforeStartTime(startTime, endTime)) {
        alert('끝 시간이 시작 시간보다 빠를 수 없습니다.');
        return; // 함수 종료
      }

      let limitMultidates;
      if(multidates.length===0){
        limitMultidates = [newAddFormState.lectureDate];
      }
      else{
        limitMultidates =multidates;
      } 

      const startTimeStr = serverformatTime(startTime.hour, startTime.minute);
      const endTimeStr = serverformatTime(endTime.hour, endTime.minute);

      const data ={
        isAllUpdate: isAllEdit,
        id: newAddFormState.id,
        name: newAddFormState.name,
        lectureType:newAddFormState.lectureType,
        teacher:  newAddFormState.teacher,
        room: newAddFormState.room,
        startTime: startTimeStr,
        endTime: endTimeStr,
        lectureDates: limitMultidates
      }

      console.log("수정 보낼 데이터", data);

    const response = await editDateAPI(data);

    console.log("수정 잘됐는지 확인", response);
    const updatedSchedule = calSchedule.filter(item => item.id !== newAddFormState.id);
    const newSchedule = [...updatedSchedule, response];
    setCalSchedule(newSchedule);
    onClickCancel();
    }
    catch(err){
      console.error(err);
    }
  }

  //반복 일정일 때 뜨는 모달
  const handleRepeatModalOpen = () => {
    if(isRepeatModalOpen){
    document.body.style.overflow = "unset";
    }
    setIsRepeatModalOpen(!isRepeatModalOpen);
  };

  //삭제
  const onClickDelete = async() =>{
      if(addFormState.repeated){
        setRepeatMode("repeatDelete")
        setIsRepeatModalOpen(!isRepeatModalOpen);
        document.body.style.overflow = "hidden";
      }
      else{
        //단일 삭제 함수
        const response = await deleteLectureAPI(newAddFormState.id, false, calSchedule)
        setCalSchedule(response);
        onClickCancel();
      }
  }


    return (
      <>
      <ModalDesign 
        mode= "edit"
        newAddFormState ={newAddFormState}
        onChangeNewAddFormState ={onChangeNewAddFormState}
        setNewAddFormState ={setNewAddFormState}
        multidates ={multidates}
        setmultiDates ={setmultiDates}
        searchKeyword ={searchKeyword}
        setSearchKeyword ={setSearchKeyword}
        searchData ={searchData}
        setSearchData ={setSearchData}
        searchDataCount ={searchDataCount}
        onClickCancel={onClickCancel}
        onClcikEditMode={onClcikEditMode}
        editDisable={editDisable}
        onClickDelete= {onClickDelete}
        isAllEdit= {isAllEdit}
        onClickEdit={onClickEdit}
        />
        <RepeatModal
        isOpen={isRepeatModalOpen}
        closeModal={handleRepeatModalOpen}
        method={repeatMode}
        onClickCancel={onClickCancel}
        lectureId ={newAddFormState.id}
        setIsAllEdit={setIsAllEdit}
        setEditDisable={setEditDisable}
      ></RepeatModal>
      </>
    )
};

export default EditForm;
