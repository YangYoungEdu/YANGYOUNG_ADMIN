import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColumnDiv, RowDiv } from "../../../style/CommonStyle";
import { ReactComponent as Plus } from "../../../Assets/Plus.svg";
import { getStudentByLectureAPI } from "../../../API/StudentAPI";
import AddStudentSearch from "../CalendarDetail/AddStudentSearch.jsx";
import AddGenericTable from "../CalendarDetail/AddGenericTable.jsx";

const LectureStudent = ({ id, handleCheckboxChange, searchKeyword,setSearchKeyword }) => {
  const [students, setStudents] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  // const [searchKeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchDataCount, setSearchDataCount] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (id) {
      getStudentByLectureAPI(id).then((res) => {
        setStudents(res);
      });
      if (students) console.log("students: ", students);
    }
  }, [id]);

  const handleAddStudentClick = () => {
    setShowAddStudent(!showAddStudent);
  };

  return (
    <LectureStudentWrapper>
      {students &&
        students.map((student, index) => (
          <ColumnDiv key={index}>
            <StudentWrapper key={index}>
              <StudentName>{student.name}</StudentName>
              <SchoolAndGrade>
                {student.school} l {student.grade}
              </SchoolAndGrade>
            </StudentWrapper>
            <Line />
          </ColumnDiv>
        ))}
      <StudentPlusIcon onClick={handleAddStudentClick} />
      <Line />
      {showAddStudent && (
        <>
          <AddStudentSearch
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
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
        </>
      )}
    </LectureStudentWrapper>
  );
};


const LectureStudentWrapper = styled(ColumnDiv)`
width: 100%;
  /* overflow: auto; */
`;

const StudentWrapper = styled(RowDiv)`
width: 100%;
align-items: center;
  justify-content: flex-start;
  padding-left: 8%;
  margin: 9px 0;
`;

const StudentName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  padding-right: 18px;
`;

const SchoolAndGrade = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray_003};
`;

const PlusIcon = styled(Plus)`
  width: 14px;
  height: 14px;
  padding-left: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StudentPlusIcon = styled(PlusIcon)`
  margin: 10px 0px 10px 0px;
`;

export default LectureStudent;
