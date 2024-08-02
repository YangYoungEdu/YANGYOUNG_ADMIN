import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getCalendarData } from "../../../Atom";
import { deleteLectureAPI } from "../CalendarDetail/UserDataController";

function RepeatModal({ isOpen, closeModal, method , onClickCancel, lectureId}) {
  const [calSchedule, setCalSchedule] = useRecoilState(getCalendarData);
  const title = method === "repeatEdit" ? "반복 일정 수정" : "반복 일정 삭제";

  console.log("모달 id", lectureId);
  // 라디오 버튼의 상태를 관리하기 위한 useState 훅
  const [Option, setOption] = useState("single");

  const handleRadioChange = (e) => {
    setOption(e.target.value);
  };

  //삭제
  const onClickDeleteBtn = async (e) =>{
    if(Option ==="single"){
      const response = await deleteLectureAPI(lectureId, false, calSchedule)
      setCalSchedule(response);
    }
    else{
      const response = await deleteLectureAPI(lectureId, true, calSchedule)
      setCalSchedule(response);
    }
    onClickCancel();
    closeModal();
  }

  return (
    <Background style={{ display: isOpen ? "block" : "none" }}>
      <Container>
        <Title>{title}</Title>
        {/* 라디오 버튼 그룹 */}
        <RadioContainer>
          <label>
            <StyledRadio
              type="radio"
              name="deleteOption"
              value="single"
              checked={Option === "single"}
              onChange={handleRadioChange}
            />
            {method ==='repeatEdit'?"이 수업만 수정" :"이 수업만 삭제"}
          </label>
          <label>
            <StyledRadio
              type="radio"
              name="deleteOption"
              value="all"
              checked={Option === "all"}
              onChange={handleRadioChange}
            />
            {method ==='repeatEdit'?"함께 등록된 모든 수업 수정" :"함께 등록된 모든 수업 삭제"}
          </label>
        </RadioContainer>

        <BtnContainer>
          <CloseBtn onClick={closeModal}>취소</CloseBtn>
          {method ==='repeatEdit'? 
            <AddButton>확인</AddButton> :
            <AddButton onClick={onClickDeleteBtn}>삭제</AddButton> } 
        </BtnContainer>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.35); /* 투명도 있는 배경색 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  position: absolute;
  top: 50%;
  left: 75%; /* 중앙 정렬 */
  transform: translate(-50%, -50%);
  width: 400px;
  height: 280px;
  max-width: 100%;
  max-height: 90%;
  overflow-y: auto;
  background-color: white;
  border-radius: 10px;
  font-family: "Pretendard Variable";
`;

const Title = styled.div`
  color: black;
  font-size: 25px;
  /* text-align: center; */
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 30px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  margin-left: 30px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    input[type="radio"] {
      margin-right: 10px;
    }
  }
`;

const StyledRadio = styled.input`
  all: unset; /* 기본 스타일 제거 */
  width: 16px; /* 라디오 버튼 크기 조정 */
  height: 16px;
  border-radius: 50%;
  border: 2px solid #15521D; /* 라디오 버튼 테두리 설정 */
  background: white;
  position: relative;
  cursor: pointer;
  
  &:checked::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #15521D; /* 선택된 라디오 버튼 내부 색상 */
  }
`;

const CloseBtn = styled.button`
  width: 88px;
  height: 39px;
  border-radius: 5px;
  border: 1px solid white;
  background: #F1F1F1;
  color: black;
  margin: 20px 10px 20px 150px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #E0E0E0;
    /* color: white; */
  }
`;

const AddButton = styled.button`
  width: 88px;
  height: 39px;
  border-radius: 5px;
  border: 1px solid white;
  background: #15521D;
  color: white; /* 버튼 텍스트 색상 수정 */
  margin: 20px 10px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #479051;
  }
`;

export default RepeatModal;
