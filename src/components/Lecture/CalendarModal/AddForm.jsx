import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
// import '../../style/css/app.css';
import { deleteDate, editDate, insertDateAPI } from '../CalendarDetail/UserDataController.jsx';
// store
import { useAddFormState } from '../../../stores/addFormState.jsx';
import { useUserData } from '../../../stores/userData.jsx';
import AddGenericTable from '../CalendarDetail/AddGenericTable.jsx';
import AddStudentSearch from '../CalendarDetail/AddStudentSearch.jsx';
import MultiDatePicker from '../CalendarDetail/MultiDatePicker.jsx';
import { getCalendarData, NewComponent } from '../../../Atom.js';
import { useRecoilState } from 'recoil';
import ModalDesign from './ModalDesign.jsx';
import { format } from 'date-fns';

//add 관련 상태관리
const AddForm = () => {
  const [addFormState, setAddFormState] = useAddFormState();
  const { active, mode } = addFormState;

  const [newAddFormState, setNewAddFormState] = useState({
    mode: 'add',
    name: '',
    room: '',
    lectureType: '',
    teacher: '',
    curDate: new Date(), //서버에 안 들어가는 변수
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 1, minute: 0, second: 0, nano: 0 },
    lectureDateList: [],
    studentList: []
  });
  const { name, room,lectureType, teacher, curDate, startTime, endTime } = newAddFormState;

  const [schedule, setCalSchedule] = useRecoilState(getCalendarData
  );

  // 학생 선택
  const [searchData, setSearchData] = useState([]);
  const [searchDataCount, setSearchDataCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState({
    nameList: [],
    schoolList: [],
    gradeList: [],
  });
  const [selectedStudent, setSelectedStudent] =useState();
  const [multidates, setmultiDates] = useState([]); //날짜 선택


  useEffect(()=>{
    console.log('학번', selectedStudent);
  },[selectedStudent])

  useEffect(() => {

    if (active) {
      const { name, room,lectureType, teacher, curDate, startTime, endTime , lectureDateList, studentList} = addFormState;
      console.log('스케줄 확인', curDate);

      setNewAddFormState({
        mode: 'add',
        name:name|| '' , 
        room: room|| '',
        lectureType: lectureType || '일반',
        teacher: teacher || '',
        curDate: curDate || new Date(),
        startTime: startTime || { hour: 0, minute: 0, second: 0, nano: 0 },
        endTime: endTime || { hour: 1, minute: 0, second: 0, nano: 0 },
        lectureDateList: lectureDateList || [],
        studentList: studentList || []
      });
    }
  }, [active, addFormState, mode]);

  const validateTimeValue = (value, defaultValue, min, max) => {
    if (value === '') return defaultValue; // 빈칸일 경우 기본값
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) return defaultValue; // NaN일 경우 기본값
    return Math.max(min, Math.min(max, intValue)); // 유효 범위로 제한
  };

  const onChangeNewAddFormState = (e) => {
    const { id, value } = e.target;
    console.log('밸류', value);
    
    const validatedValue = value === '' ? '0' : value; // 빈칸 처리
  
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
          startTime: {
            ...newAddFormState.startTime,
            hour: validateHour(validatedValue)
          }
        });
        break;
      case 'start-minute':
        setNewAddFormState({
          ...newAddFormState,
          startTime: {
            ...newAddFormState.startTime,
            minute: validateMinute(validatedValue)
          }
        });
        break;
      case 'end-hour':
        setNewAddFormState({
          ...newAddFormState,
          endTime: {
            ...newAddFormState.endTime,
            hour: validateHour(validatedValue)
          }
        });
        break;
      case 'end-minute':
        setNewAddFormState({
          ...newAddFormState,
          endTime: {
            ...newAddFormState.endTime,
            minute: validateMinute(validatedValue)
          }
        });
        break;
      default:
        break;
    }
  };
  

  // 학생 리스트 추가
  const handleCheckboxChange = (id) => {
    console.log('id 확인', id);
    setSelectedStudent((prevSelectedStudent) => {
      if (prevSelectedStudent.includes(id)) {
        console.log('있음');
        // 배열에서 해당 id를 제거
        return prevSelectedStudent.filter((studentId) => studentId !== id);
      } else {
        console.log('없음');
        // 배열에 해당 id를 추가
        return [...prevSelectedStudent, id];
      }
    });

    setNewAddFormState({ ...newAddFormState, studentList: selectedStudent });
  };

  const onClickCancel = () => {
    setAddFormState({ ...addFormState, active: false });
  };

  //끝시간이 시작시간보다 빠른지 확인
  const isEndTimeBeforeStartTime = (startTime, endTime) => {
    const startTimeInMinutes = startTime.hour * 60 + startTime.minute;
    const endTimeInMinutes = endTime.hour * 60 + endTime.minute;
    return endTimeInMinutes < startTimeInMinutes;
  };
  
  const onClickAdd = async() => {
    try{

      const { startTime, endTime } = newAddFormState;

      // 시간 비교 및 예외 처리
      if (isEndTimeBeforeStartTime(startTime, endTime)) {
        alert('끝 시간이 시작 시간보다 빠를 수 없습니다.');
        return; // 함수 종료
      }

      let updatedFormState;
      if(multidates.length===0){
        const formattedDate = format(newAddFormState.curDate, "yyyy-MM-dd");
        updatedFormState = {
          ...newAddFormState,
          studentList: selectedStudent,
          lectureDateList: [formattedDate],
        };
      }
      else{
        // 학생 리스트를 newAddFormState에 추가
        updatedFormState = {
          ...newAddFormState,
          studentList: selectedStudent,
          lectureDateList: multidates,
        };
      }

      const newSchedule = await insertDateAPI(updatedFormState);
 
      setCalSchedule((schedule)=>[ ...schedule, newSchedule ]); 
      setAddFormState({ ...addFormState, active: false });
    }
    catch(err){
      console.error(err);
    }
  };

    return (
      <ModalDesign 
        mode= "add"
        onChangeNewAddFormState ={onChangeNewAddFormState}
        newAddFormState ={newAddFormState}
        multidates ={multidates}
        setmultiDates ={setmultiDates}
        searchKeyword ={searchKeyword}
        setSearchKeyword ={setSearchKeyword}
        searchData ={searchData}
        setSearchData ={setSearchData}
        searchDataCount ={searchDataCount}
        setSearchDataCount ={setSearchDataCount}
        handleCheckboxChange ={handleCheckboxChange}
        selectedStudent ={selectedStudent}
        active ={active}
        setSelectedStudent ={setSelectedStudent}
        onClickCancel ={onClickCancel}
        onClickAdd ={onClickAdd}/>
    )
};

export default AddForm;
