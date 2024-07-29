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

  
    return (
      <ModalDesign 
        mode= "edit"
        multidates ={multidates}
        setmultiDates ={setmultiDates}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        searchKeyword ={searchKeyword}
        setSearchKeyword ={searchKeyword}
        searchData ={searchData}
        setSearchData ={setSearchData}
        searchDataCount ={searchDataCount}
        />
    )
};

export default EditForm;
