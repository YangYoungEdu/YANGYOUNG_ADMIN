import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
// import '../../style/css/app.css';
import { insertDate, deleteDate, editDate } from './UserDataController.jsx';
// store
import { useAddFormState } from '../../../stores/addFormState.jsx';
import { useUserData } from '../../../stores/userData.jsx';
import AddGenericTable from './AddGenericTable.jsx';
import AddStudentSearch from './AddStudentSearch.jsx';
import MultiDatePicker from './MultiDatePicker.jsx';

const AddForm = () => {
  const [addFormState, setAddFormState] = useAddFormState();
  const { active, mode } = addFormState;

  const [newAddFormState, setNewAddFormState] = useState({
    name: '',
    room: '',
    teacher: '',
    curDate: new Date(), //서버에 안 들어가는 변수
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 1, minute: 0, second: 0, nano: 0 },
    lectureDateList: [],
    studentList: []
  });
  const { name, room, teacher, curDate, startTime, endTime, lectureDateList,studentList } = newAddFormState;
  const [userData, setUserData] = useUserData();
  const { schedule } = userData;
  const [beforeEdit, setBeforeEdit] = useState();

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
      const { name, room, teacher, curDate, startTime, endTime , lectureDateList, studentList} = addFormState;
      console.log('스케줄 확인', studentList);

      setNewAddFormState({
        name:name|| '' , 
        room: room|| '',
        teacher: teacher || '',
        curDate: curDate || new Date(),
        startTime: startTime || { hour: 0, minute: 0, second: 0, nano: 0 },
        endTime: endTime || { hour: 1, minute: 0, second: 0, nano: 0 },
        lectureDateList: lectureDateList || [],
        studentList: studentList || []
      });
      if (mode === 'edit') {

        setBeforeEdit({ name, room, teacher, curDate, startTime, endTime , lectureDateList, studentList});
      }
    }
  }, [active, addFormState, mode]);

  const onChangeCurDate = (value) => {
    setNewAddFormState({ ...newAddFormState, curDate: value });
  };

  const onChangeNewAddFormState = (e) => {
    const { id, value } = e.target;
    console.log('밸류', value);
    const intValue = parseInt(value, 10);
    switch (id) {
      case 'input-name':
        setNewAddFormState({ ...newAddFormState, name: value });
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
          startTime: { ...startTime, hour: intValue }
        });
        break;
      case 'start-minute':
        setNewAddFormState({
          ...newAddFormState,
          startTime: { ...startTime, minute: intValue }
        });
        break;
      case 'end-hour':
        setNewAddFormState({
          ...newAddFormState,
          endTime: { ...endTime, hour: intValue }
        });
        break;
      case 'end-minute':
        setNewAddFormState({
          ...newAddFormState,
          endTime: { ...endTime, minute: intValue }
        });
        break;

      default:
        break;
    }
  };

  const onClickCancel = () => {
    setAddFormState({ ...addFormState, active: false });
  };

  const onClickAdd = () => {
    // 학생 리스트를 newAddFormState에 추가
    const updatedFormState = {
      ...newAddFormState,
      studentList: selectedStudent,
      lectureDateList: multidates,
    };

    const newSchedule = insertDate(updatedFormState, schedule);
    if (newSchedule !== false) {
			console.log("일정추가", updatedFormState);
      setUserData({ ...userData, schedule: newSchedule });
      setAddFormState({ ...addFormState, active: false });
      }
    };

  const onClickEdit = () => {

    const updatedFormState = {
      ...newAddFormState,
      studentList: selectedStudent,
      lectureDateList: multidates,
    };

    const newSchedule = editDate(updatedFormState, beforeEdit, schedule);

    if (newSchedule !== false) {
      setUserData({ ...userData, schedule: newSchedule });
      setAddFormState({ ...addFormState, active: false });
      }
    };

  const onClickDelete = () => {
    const newSchedule = deleteDate(curDate, startTime, endTime, name, schedule); //id로 변경필요
    setUserData({ ...userData, schedule: newSchedule });
    setAddFormState({ ...addFormState, active: false });
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

  if (!active) return null;
  else if (active)
    return (
      <div id="panel">
        <div id="add-form">
          <div id="add-form-title">{mode === 'add' ? '일정 추가' : '일정 수정'}</div>
          <div id="input-form">
            <div className="label">이름</div>
            <input id="input-name" value={name} onChange={onChangeNewAddFormState} />
          </div>
          <div id="teacher-picker-form">
            <div className="label">담당 선생님</div>
            <div>
              <select id="teacher-select" value={teacher} onChange={onChangeNewAddFormState}>
                <option value="">선택하세요</option>
                <option value="김삼유">김삼유</option>
                <option value="장영해">장영해</option>
                <option value="전재우">전재우</option>
              </select>
            </div>
          </div>
          <div id="input-form">
            <div className="label">강의실</div>
            <input id="input-room" value={room} onChange={onChangeNewAddFormState} />
          </div>
          <div id="date-picker-form">
            <div className="label">날짜</div>
            <div id="date-picker">
              <DatePicker selected={curDate} onChange={onChangeCurDate} />
            </div>
          </div>
          <div id="date-picker-form">
            <div id="date-picker">
              <MultiDatePicker  
                multidates={multidates}
                setmultiDates={setmultiDates} />
            </div>
          </div>
          <div id="time-picker-form">
            <div className="label">시작 시간</div>
            <div>
              <select id="start-hour" value={startTime.hour} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              시
              <select id="start-minute" value={startTime.minute} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              분
            </div>
          </div>
          <div id="time-picker-form">
            <div className="label">종료 시간</div>
            <div>
              <select id="end-hour" value={endTime.hour} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              시
              <select id="end-minute" value={endTime.minute} onChange={onChangeNewAddFormState}>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              분
            </div>
          </div>
          <div id= 'select-student'>
            {/* 검색 영역 
            <AddStudentSearch
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />*/}
            {/* 테이블 
            <AddGenericTable 
              searchData={searchData}
              setSearchData={setSearchData}
              searchDataCount={searchDataCount}
              setSearchDataCount={setSearchDataCount}
              searchKeyword={searchKeyword}
              handleCheckboxChange={handleCheckboxChange}
              selectedStudent={selectedStudent}
              active={active}
              setSelectedStudent={setSelectedStudent}
            />*/}
          </div>
          <div id="option-form">
            <div id="cancel-btn" className="btn" onClick={onClickCancel}>
              취소
            </div>
            {mode === 'add' ? (
              <div id="add-btn" className="btn" onClick={onClickAdd}>
                저장
              </div>
            ) : null}
            {mode === 'edit' ? (
              <>
                <div id="edit-btn" className="btn" onClick={onClickEdit}>
                  수정
                </div>
                <div id="delete-btn" className="btn" onClick={onClickDelete}>
                  삭제
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
};

export default AddForm;
