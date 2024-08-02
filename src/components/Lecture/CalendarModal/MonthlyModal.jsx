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
import { useRecoilState } from "recoil";
import { monthlyModalOpen, monthToDay } from "../../../Atom.js";
//보여주는 모달 디자인
const MonthlyModal = ({
}) => {
  const [isMonthlyOpen, setIsMonthlyOpen] = useRecoilState(monthlyModalOpen);
  const [monthToDayData, setMonthToDayData] = useRecoilState(monthToDay);

  const onClickCancel = (e) => {
    // e.stopPropagation();
    setIsMonthlyOpen(false);
  };

  const formatDate = (dateString) => {
    // YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
    const [year, month, day] = dateString.split('-').map(Number);
  
    // 날짜 객체 생성
    const date = new Date(year, month - 1, day);
  
    // 날짜 포맷팅
    const formattedDate = `${year}년 ${month}월 ${day}일`;
  
    return formattedDate;
  };

  console.log("monthToDayData", monthToDayData);

  if (!isMonthlyOpen) {
    return null; 
  }

  return (
    <Panel id="panel" onClick={onClickCancel} >
      <StyledAddForm id="add-form" onClick={(e)=>e.stopPropagation()}>
        <TopDiv>
          {/* 강의제목, 저장 버튼, 닫기 버튼 */}
          <UpperDiv id="input-form">
              <span>{formatDate(monthToDayData[0].lectureDate)}</span>
              <LightX id="cancel-btn" className="btn" style={{cursor:"pointer"}} onClick={onClickCancel} />
          </UpperDiv>

          <MiddleDiv>
            
          </MiddleDiv>

          
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
  &>span {
    font-family: Pretendard Variable;
    font-size: 26px;
    font-weight: 700;
    color: #555;
  }
`;

const MiddleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

export default MonthlyModal;
