import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { useAddFormState } from '../../../stores/addFormState.jsx';
import AddForm from './AddForm.jsx';
import MultiDatePicker from '../CalendarDetail/MultiDatePicker.jsx';
import AddStudentSearch from '../CalendarDetail/AddStudentSearch.jsx';
import AddGenericTable from '../CalendarDetail/AddGenericTable.jsx';

//보여주는 모달 디자인
const ModalDesign = ({
  mode,

  //add
  onChangeNewAddFormState,
  newAddFormState,
  multidates,
  setmultiDates,
  searchKeyword,
  setSearchKeyword,
  searchData,
  setSearchData,
  searchDataCount,
  setSearchDataCount,
  handleCheckboxChange,
  selectedStudent,
  active,
  setSelectedStudent,
  onClickCancel,
  onClickAdd,

  //edit
}) => {

  return (
    <div id="panel">
      <div id="add-form">
        <div id="add-form-title">{mode === 'add' ? '일정 추가' : '일정 수정'}</div>
        <div id="input-form">
          <div className="label">이름</div>
          <input id="input-name" value={mode === 'add' ?newAddFormState.name: null} onChange={onChangeNewAddFormState} />
        </div>
        <div id="lectureType-picker-form">
          <div className="label">강의타입</div>
          <div>
            <select id="lectureType-select" value={mode ==='add' ? newAddFormState.lectureType: null} onChange={onChangeNewAddFormState} >
            <option value="일반">일반</option>
            <option value="특반">특반</option>
            </select>
          </div>
        </div>
        <div id="teacher-picker-form">
          <div className="label">담당 선생님</div>
          <div>
            <select id="teacher-select" value={mode==='add'?newAddFormState.teacher: null} onChange={onChangeNewAddFormState}>
              <option value="">선택하세요</option>
              <option value="김삼유">김삼유</option>
              <option value="장영해">장영해</option>
              <option value="전재우">전재우</option>
            </select>
          </div>
        </div>
        <div id="input-form">
          <div className="label">강의실</div>
          <input id="input-room" value={mode==='add' ?newAddFormState.room: null} onChange={onChangeNewAddFormState} />
        </div>
        <div id="date-picker-form">
          <div id="date-picker">
            <MultiDatePicker 
              multidates={multidates}
              setmultiDates={setmultiDates} 
              curDate={mode ==='add'? newAddFormState.curDate: null}/>
          </div>
        </div>
        <div id="time-picker-form">
          <div className="label">시작 시간</div>
          <div>
            <select id="start-hour" value={mode ==='add'?newAddFormState.startTime.hour: null} onChange={onChangeNewAddFormState}>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            시
            <select id="start-minute" value={mode ==='add'?newAddFormState.startTime.minute: null} onChange={onChangeNewAddFormState}>
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
            <select id="end-hour" value={mode ==='add'?newAddFormState.endTime.hour: null} onChange={onChangeNewAddFormState}>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            시
            <select id="end-minute" value={mode ==='add'?newAddFormState.endTime.minute: null} onChange={onChangeNewAddFormState}>
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
          {/* 검색 영역  */}
          {mode==='add'? <AddStudentSearch
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
          /> :null}
          {/* 테이블  */}
            {mode ==='add' ?<AddGenericTable
              searchData={searchData}
              setSearchData={setSearchData}
              searchDataCount={searchDataCount}
              setSearchDataCount={setSearchDataCount}
              searchKeyword={searchKeyword}
              handleCheckboxChange={handleCheckboxChange}
              selectedStudent={selectedStudent}
              active={active}
              setSelectedStudent={setSelectedStudent}
            /> :null}
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
              <div id="edit-btn" className="btn" >
                수정
              </div>
              <div id="delete-btn" className="btn" >
                삭제
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModalDesign;
