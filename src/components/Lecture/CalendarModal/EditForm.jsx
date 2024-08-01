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
import { getCalendarData } from '../../../Atom.js';
import { useRecoilState } from 'recoil';
import ModalDesign from './ModalDesign.jsx';

//edit 관련 상태관리
const EditForm = () => {
  const [addFormState, setAddFormState] = useAddFormState();
  const { active, mode } = addFormState;

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
  }, [active, addFormState, mode]);

  const onClickCancel = () => {
    setAddFormState({ ...addFormState, active: false });
  };

    return (
      <ModalDesign 
        mode= "edit"
        newAddFormState ={newAddFormState}
        multidates ={multidates}
        setmultiDates ={setmultiDates}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        searchKeyword ={searchKeyword}
        setSearchKeyword ={searchKeyword}
        searchData ={searchData}
        setSearchData ={setSearchData}
        searchDataCount ={searchDataCount}
        onClickCancel={onClickCancel}
        />
    )
};

export default EditForm;
