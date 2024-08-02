import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import AddStudentSearch from "../CalendarDetail/AddStudentSearch.jsx";
import AddGenericTable from "../CalendarDetail/AddGenericTable.jsx";

import LectureStudent from "./LectureStudent.jsx";
import LectureAttendance from "./LectureAttendance.jsx";
import LectureTask from "./LectureTask.jsx";
import LectureMaterial from "./LectureMaterial.jsx";

import { ReactComponent as LightX } from "../../../Assets/LightX.svg";
import { format } from "date-fns";
//보여주는 모달 디자인
const ModalDesign = ({
  mode,

  //add
  onChangeNewAddFormState,
  newAddFormState,
  setNewAddFormState,
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
  onClcikEditMode,
  editDisable,
  onClickDelete,
  isAllEdit,
  onClickEdit
}) => {
  console.log("newFormState:", newAddFormState);
  const [onClicked, setOnClicked] = useState({
    student: true,
    attendance: false,
    task: false,
    material: false,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    mode === "add" ? newAddFormState.curDate : null
  );

  console.log("id", newAddFormState.id);
  console.log("repeated", newAddFormState.repeated);

  const handleButtonClick = (type) => {
    setOnClicked((prevState) => ({
      ...prevState,
      student: type === "student" ? true : false,
      attendance: type === "attendance" ? true : false,
      task: type === "task" ? true : false,
      material: type === "material" ? true : false,
    }));
  };

  const handleDatePickerOpen = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleRemoveDate = (date) => {
    setmultiDates(multidates.filter((d) => d !== date));
  };

  // 컴포넌트가 마운트될 때 multidates를 리셋하고 curDate를 추가
  useEffect(() => {
    if (newAddFormState.lectureDate && mode==='edit') {
      if(isAllEdit){ //반복 일정 수정

        if(editDisable===false){
          setmultiDates(newAddFormState.allLectureDate);
          setStartDate(newAddFormState.lectureDate);
        }
        else{
          const formattedDate = format(newAddFormState.lectureDate, "yyyy-MM-dd");
          setmultiDates([formattedDate]);
          setStartDate(newAddFormState.lectureDate);
        }
      }
      else{
        //단일 일정 수정
      const formattedDate = format(newAddFormState.lectureDate, "yyyy-MM-dd");
      setmultiDates([formattedDate]);
      setStartDate(newAddFormState.lectureDate); // DatePicker의 시작 날짜도 curDate로 설정
      }
    }
    if (newAddFormState.curDate && mode ==='add'){
      const formattedDate = format(newAddFormState.curDate, "yyyy-MM-dd");
      setmultiDates([formattedDate]);
      setStartDate(newAddFormState.lectureDate);
    }
  }, [newAddFormState.lectureDate, newAddFormState.curDate, editDisable]);

  const handleChange = (date) => {
    console.log("받은 날자 확인", newAddFormState.lectureDate);
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      if (multidates.includes(newDate)) {
        // 이미 선택된 날짜라면 제거
        setmultiDates(multidates.filter((d) => d !== newDate));
      } else {
        // 새로운 날짜 추가
        //반복일정 수정인 경우
        if(isAllEdit||mode==='add'){
          setmultiDates([...multidates, newDate]);  
        }
        else{
          //단일 일정 수정인 경우 - 날짜를 하나만 받아옴
          if(multidates<1){
            setmultiDates([...multidates, newDate]);
          }
        }
      }
    }
  };
  return (
    <Panel id="panel" onClick={onClickCancel} >
      <StyledAddForm id="add-form" onClick={(e)=>e.stopPropagation()}>
        <TopDiv>
          {/* 강의제목, 저장 버튼, 닫기 버튼 */}
          <UpperDiv id="input-form">
            <input
              id="input-name"
              value={
                mode === "add" ? newAddFormState.name : newAddFormState.name
              }
              onChange={onChangeNewAddFormState}
              placeholder="수업 이름을 적어주세요."
              disabled = {mode !== 'add' && editDisable}
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
                {editDisable?
                  (
                  <>
                  <SubmitButton id="edit-btn" className="btn" onClick={onClcikEditMode}>
                    수정
                  </SubmitButton>
                  <SubmitButton id="delete-btn" className="btn" onClick={onClickDelete}>
                    삭제
                  </SubmitButton>
                  </>
                  )
                  :
                  (
                  <>
                  <SubmitButton id="delete-btn" className="btn" onClick={onClcikEditMode}>
                    취소
                  </SubmitButton>
                  <SubmitButton id="edit-btn" className="btn" onClick={onClickEdit} >
                  저장
                  </SubmitButton>
                  </>
                  )}
                </>
              ) : null}

              <LightX id="cancel-btn" className="btn" style={{cursor:"pointer"}} onClick={onClickCancel} />
            </ButtonContainer>
          </UpperDiv>

          <MiddleDiv>
            {/* 수업일자 + 수업시간, 일자 추가 옵션 버튼 */}
            <DetailInfo1>
              <Left>
                <Label className="label">수업 일자</Label>
                {mode==='add'||!editDisable?
                  <AddDatesOption onClick={handleDatePickerOpen}>
                    날짜 추가
                  </AddDatesOption> : null}
              </Left>
              <Right id="date-picker-form">
                {/* 선택된 날짜들은 datepicker 달력 노출 여부와 상관 없이 항상 보여야 함 */}
                <DateItemContainer>
                  {multidates.length > 0 &&
                    multidates.map((date) => (
                      <DateItem key={date}>
                        {date}
                        {mode==='add'||!editDisable?
                        <RemoveButton onClick={() => handleRemoveDate(date)}>
                          x
                        </RemoveButton>
                        : null
                        }
                      </DateItem>
                    ))}
                </DateItemContainer>
                {/* 날짜 추가 div를 누르면 date picker 나옴 */}
                  <div id="date-picker">
                    {isDatePickerOpen && (
                      <div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                            handleChange(date);
                          }}
                          onClickOutside={() => setStartDate(null)}
                          selectsStart
                          startDate={startDate}
                          dateFormat="yyyy/MM/dd"
                          inline
                          highlightDates={multidates.map((d) => new Date(d))}
                        />
                      </div>
                    )}
                  </div>
              </Right>
            </DetailInfo1>

            {/* 수업시간, 선생님, 강의실, 강의타입 */}
            <DetailInfo id="lectureTime-picker-form">
              <Label className="label">수업 시간</Label>

              {/* 드롭다운 대신 텍스트 입력 받는 게 ux적으로 나을 것 같다는 판단 */}
              <TimePicker>
                <input
                  type="number"
                  id="start-hour"
                  value={
                    mode === "add"
                      ? newAddFormState.startTime.hour
                      : newAddFormState.startTime.hour
                  }
                  onChange={(e) =>
                    onChangeNewAddFormState({
                      target: { id: "start-hour", value: e.target.value },
                    })
                  }
                  placeholder="시"
                  min="0"
                  max="23"
                  disabled = {mode !== 'add' && editDisable}
                />
                :
                <input
                  type="number"
                  id="start-minute"
                  value={
                    mode === "add"
                      ? newAddFormState.startTime.minute
                      : newAddFormState.startTime.minute
                  }
                  onChange={(e) =>
                    onChangeNewAddFormState({
                      target: { id: "start-minute", value: e.target.value },
                    })
                  }
                  placeholder="분"
                  min="0"
                  max="59"
                  step="1"
                  disabled = {mode !== 'add' && editDisable}
                />
                -
                <input
                  type="number"
                  id="end-hour"
                  value={
                    mode === "add"
                      ? newAddFormState.endTime.hour
                      : newAddFormState.endTime.hour
                  }
                  onChange={(e) =>
                    onChangeNewAddFormState({
                      target: { id: "end-hour", value: e.target.value },
                    })
                  }
                  placeholder="시"
                  min="0"
                  max="23"
                  disabled = {mode !== 'add' && editDisable}
                />
                :
                <input
                  type="number"
                  id="end-minute"
                  value={
                    mode === "add"
                      ? newAddFormState.endTime.minute
                      : newAddFormState.endTime.minute
                  }
                  onChange={(e) =>
                    onChangeNewAddFormState({
                      target: { id: "end-minute", value: e.target.value },
                    })
                  }
                  placeholder="분"
                  min="0"
                  max="59"
                  step="1"
                  disabled = {mode !== 'add' && editDisable}
                />
              </TimePicker>
            </DetailInfo>
            <DetailInfo id="lectureType-picker-form">
              <Label className="label">강의 타입</Label>
              <SelectWrapper disabled= {mode !== 'add' && editDisable}>
                <select
                  id="lectureType-select"
                  value={
                    mode === "add"
                      ? newAddFormState.lectureType
                      : newAddFormState.lectureType
                  }
                  onChange={onChangeNewAddFormState}
                  disabled = {mode !== 'add' && editDisable}
                >
                  <option value="일반">일반</option>
                  <option value="특강">특강</option>
                </select>
              </SelectWrapper>
            </DetailInfo>
            <DetailInfo id="teacher-picker-form">
              <Label className="label">선생님</Label>
              <StyledMiddleInput
                id="teacher-select"
                value={
                  mode === "add"
                    ? newAddFormState.teacher
                    : newAddFormState.teacher
                }
                onChange={onChangeNewAddFormState}
                placeholder="선생님 이름을 적어주세요."
                disabled = {mode !== 'add' && editDisable}
              />
            </DetailInfo>
            <DetailInfo id="input-form">
              <Label className="label">강의실</Label>
              <StyledMiddleInput
                id="input-room"
                value={
                  mode === "add" ? newAddFormState.room : newAddFormState.room
                }
                onChange={onChangeNewAddFormState}
                placeholder="강의실을 적어주세요."
                disabled = {mode !== 'add' && editDisable}
              />
            </DetailInfo>
          </MiddleDiv>

          <LowerDiv>
            {mode === "add" ? (
              <AddStudentContainer>
                <AddStudentSearch
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                />{" "}
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
              </AddStudentContainer>
            ) : (
              <>
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
                    x
                  >
                    {/* {" "} */}
                    수업 자료
                  </Button>
                </ButtonWrapper>

                {/* 강의별 학생 목록*/}
                {onClicked.student && (
                  <LectureStudent
                    id={newAddFormState.id}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    newAddFormState ={newAddFormState}
                    setNewAddFormState ={setNewAddFormState}
                  />
                )}

                {/* 강의별 출석 목록*/}
                {onClicked.attendance && (
                  <LectureAttendance
                    id={newAddFormState.id}
                    date={newAddFormState.lectureDate}
                  />
                )}

                {/* 강의별 과제 목록*/}
                {onClicked.task && <LectureTask id={newAddFormState.id} />}

                {/* 강의별 자료 목록 */}
                {/* ToDo: 강의별 자료 목록 API 연동 */}
                {onClicked.material && (
                  <LectureMaterial
                    lecture={newAddFormState.id}
                    date={newAddFormState.lectureDate}
                  />
                )}
              </>
            )}
          </LowerDiv>
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
  width: 100%;
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
  overflow: auto;
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

const DetailInfo1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 22px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DateItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, auto));
  margin-bottom: 5px;
`;

const DateItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: -5px;
  margin-bottom: 10px;
  padding: 5px 1px 5px 5px;
  box-sizing: border-box;

  width: 120px;
  background-color: #efefef;
  border-radius: 50px;

  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  cursor: default;
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
  min-width: 60px;
  white-space: nowrap;
`;

const AddDatesOption = styled.button`
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: #bababa;
  text-decoration: underline;
  cursor: pointer;
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

  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const SelectWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 5px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: ${(props) => props.disabled? "default" : "pointer"};

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

const AddStudentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  box-sizing: border-box;
`;
const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 13px;

  border: none;
  color: black;
  cursor: pointer;

  background: #d0d0d0;
`;

export default ModalDesign;
