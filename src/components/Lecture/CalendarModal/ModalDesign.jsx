import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import { useAddFormState } from "../../../stores/addFormState.jsx";
import AddForm from "./AddForm.jsx";
import MultiDatePicker from "../CalendarDetail/MultiDatePicker.jsx";
import AddStudentSearch from "../CalendarDetail/AddStudentSearch.jsx";
import AddGenericTable from "../CalendarDetail/AddGenericTable.jsx";

import { ReactComponent as LightX } from "../../../Assets/LightX.svg";

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
    <Panel id="panel">
      <StyledAddForm id="add-form">
        <TopDiv>
          {/* 강의제목, 저장 버튼, 닫기 버튼 */}
          <UpperDiv id="input-form">
            {/* <div className="label">이름</div> */}
            <input
              id="input-name"
              value={mode === "add" ? newAddFormState.name : null}
              onChange={onChangeNewAddFormState}
              placeholder="수업 이름을 적어주세요."
            />

            <ButtonContainer id="option-form">
              {/* 저장, 수정 버튼 */}
              {mode === "add" ? (
                <SubmitButton id="add-btn" className="btn" onClick={onClickAdd}>
                  저장
                </SubmitButton>
              ) : null}
              {mode === "edit" ? (
                <>
                  <SubmitButton id="edit-btn" className="btn">
                    수정
                  </SubmitButton>
                  <SubmitButton id="delete-btn" className="btn">
                    삭제
                  </SubmitButton>
                </>
              ) : null}

              <LightX id="cancel-btn" className="btn" onClick={onClickCancel} />
            </ButtonContainer>
          </UpperDiv>

          {/* 수업시간, 선생님, 강의실, 강의타입 */}
          <div id="lectureType-picker-form">
            <div className="label">강의타입</div>
            <div>
              <select
                id="lectureType-select"
                value={mode === "add" ? newAddFormState.lectureType : null}
                onChange={onChangeNewAddFormState}
              >
                <option value="일반">일반</option>
                <option value="특반">특반</option>
              </select>
            </div>
          </div>
          <div id="teacher-picker-form">
            <div className="label">담당 선생님</div>
            <div>
              <select
                id="teacher-select"
                value={mode === "add" ? newAddFormState.teacher : null}
                onChange={onChangeNewAddFormState}
              >
                <option value="">선택하세요</option>
                <option value="김삼유">김삼유</option>
                <option value="장영해">장영해</option>
                <option value="전재우">전재우</option>
              </select>
            </div>
          </div>
          <div id="input-form">
            <div className="label">강의실</div>
            <input
              id="input-room"
              value={mode === "add" ? newAddFormState.room : null}
              onChange={onChangeNewAddFormState}
            />
          </div>
          <div id="date-picker-form">
            <div id="date-picker">
              <MultiDatePicker
                multidates={multidates}
                setmultiDates={setmultiDates}
                curDate={mode === "add" ? newAddFormState.curDate : null}
              />
            </div>
          </div>
          <div id="time-picker-form">
            <div className="label">시작 시간</div>
            <div>
              <select
                id="start-hour"
                value={mode === "add" ? newAddFormState.startTime.hour : null}
                onChange={onChangeNewAddFormState}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              시
              <select
                id="start-minute"
                value={mode === "add" ? newAddFormState.startTime.minute : null}
                onChange={onChangeNewAddFormState}
              >
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
              <select
                id="end-hour"
                value={mode === "add" ? newAddFormState.endTime.hour : null}
                onChange={onChangeNewAddFormState}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              시
              <select
                id="end-minute"
                value={mode === "add" ? newAddFormState.endTime.minute : null}
                onChange={onChangeNewAddFormState}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              분
            </div>
          </div>
          {/* <div id="select-student"> */}
          {/* 검색 영역  */}
          {/* {mode === "add" ? (
            <AddStudentSearch
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          ) : null} */}
          {/* 테이블  */}
          {/* {mode === "add" ? (
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
            />
          ) : null}
        </div> */}
        </TopDiv>
      </StyledAddForm>
    </Panel>
  );
};

const Panel = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
`;

const StyledAddForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  /* padding: 29px 46px 29px 46px; */
  box-sizing: border-box;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 50%;

  background-color: white;
`;

const TopDiv = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 100%;
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  input {
    font-family: Pretendard Variable;
    font-size: 26px;
    font-weight: 700;
    color: #555;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const SubmitButton = styled.button`
  width: 60px;
  height: 31px;
  border-radius: 5px;
  background-color: #efefef;

  text-align: center;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  color: #555555;
  white-space: nowrap;
  cursor: pointer;
`;

export default ModalDesign;
