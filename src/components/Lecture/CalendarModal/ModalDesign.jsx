import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import { useAddFormState } from "../../../stores/addFormState.jsx";
import AddForm from "./AddForm.jsx";
import MultiDatePicker from "../CalendarDetail/MultiDatePicker.jsx";
import AddStudentSearch from "../CalendarDetail/AddStudentSearch.jsx";
import AddGenericTable from "../CalendarDetail/AddGenericTable.jsx";

import LectureStudent from "./LectureStudent.jsx";
import LectureAttendance from "./LectureAttendance.jsx";
import LectureTask from "./LectureTask.jsx";
import LectureMaterial from "./LectureMaterial.jsx";

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
  const [onClicked, setOnClicked] = useState({
    student: true,
    attendance: false,
    task: false,
    material: false,
  });

  const handleButtonClick = (type) => {
    setOnClicked((prevState) => ({
      ...prevState,
      student: type === "student" ? true : false,
      attendance: type === "attendance" ? true : false,
      task: type === "task" ? true : false,
      material: type === "material" ? true : false,
    }));
  };

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

          <MiddleDiv>
            {/* datepicker 먼저 */}
            {/* <div id="date-picker-form">
            <div id="date-picker">
              <MultiDatePicker
                multidates={multidates}
                setmultiDates={setmultiDates}
                curDate={mode === "add" ? newAddFormState.curDate : null}
              />
            </div>
          </div> */}

            {/* 수업시간, 선생님, 강의실, 강의타입 */}
            <DetailInfo id="time-picker-form">
              <Label className="label">수업 시간</Label>
              <TimePicker>
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
                  value={
                    mode === "add" ? newAddFormState.startTime.minute : null
                  }
                  onChange={onChangeNewAddFormState}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                분 ~
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
              </TimePicker>
            </DetailInfo>

            <DetailInfo id="lectureType-picker-form">
              <Label className="label">강의타입</Label>
              <SelectWrapper>
                <select
                  id="lectureType-select"
                  value={mode === "add" ? newAddFormState.lectureType : null}
                  onChange={onChangeNewAddFormState}
                >
                  <option value="일반">일반</option>
                  <option value="특반">특강</option>
                </select>
              </SelectWrapper>
            </DetailInfo>
            <DetailInfo id="teacher-picker-form">
              <Label className="label">담당 선생님</Label>
              <SelectWrapper>
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
              </SelectWrapper>
            </DetailInfo>
            <DetailInfo id="input-form">
              <Label className="label">강의실</Label>
              <StyledMiddleInput
                id="input-room"
                value={mode === "add" ? newAddFormState.room : null}
                onChange={onChangeNewAddFormState}
                placeholder="강의실을 적어주세요."
              />
            </DetailInfo>
          </MiddleDiv>

          <LowerDiv>
            {/* 학생, 출석, 과제 버튼*/}
            <ButtonWrapper>
              <Button
                isActive={onClicked.student}
                onClick={() => handleButtonClick("student")}
              >
                학생
              </Button>
              <Button
                isActive={onClicked.attendance}
                onClick={() => handleButtonClick("attendance")}
              >
                출석 체크
              </Button>
              <Button
                isActive={onClicked.task}
                onClick={() => handleButtonClick("task")}
              >
                과제
              </Button>
              <Button
                isActive={onClicked.material}
                onClick={() => handleButtonClick("material")}
              >
                {/* {" "} */}
                수업 자료
              </Button>
            </ButtonWrapper>

            {/* ToDo: 조건에 따라 정보 표시 */}
            {/* 강의별 학생 목록*/}
            {onClicked.student && <LectureStudent />}

            {/* 강의별 출석 목록*/}
            {onClicked.attendance && <LectureAttendance />}

            {/* 강의별 과제 목록*/}
            {onClicked.task && <LectureTask />}

            {/* 강의별 자료 목록 */}
            {/* ToDo: 강의별 자료 목록 API 연동 */}
            {onClicked.material && <LectureMaterial />}
          </LowerDiv>

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

  padding: 29px 46px 29px 46px;
  box-sizing: border-box;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 50%;

  background-color: white;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 33px;
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

const MiddleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 22px;
`;

const Label = styled.label`
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
`;

const StyledMiddleInput = styled.input`
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: left;

  &::placeholder {
    color: #bababa;
  }
`;
const TimePicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`;

const SelectWrapper = styled.div`
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.colors.gray_001};
`;

const Button = styled.button`
  width: 25%;
  height: 37px;
  border-radius: 5px;
  margin: 0 3px;
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  text-align: center;
  font-weight: 700;
  cursor: pointer;

  background-color: ${(props) =>
    props.isActive ? "#95C25C" : props.theme.colors.gray_001};
  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.black};

  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LowerDiv = styled.div`
  margin-top: 42px;
  width: 100%;
`;
export default ModalDesign;
