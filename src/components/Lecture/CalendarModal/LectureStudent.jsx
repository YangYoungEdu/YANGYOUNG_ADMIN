import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColumnDiv, RowDiv } from "../../../style/CommonStyle";
import { ReactComponent as Plus } from "../../../Assets/Plus.svg";
import { getStudentByLectureAPI } from "../../../API/StudentAPI";

const LectureStudent = ({id}) => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (id) {
      getStudentByLectureAPI(id).then((res) => {
        setStudents(res);
      });
      console.log("students: ", students);
    }
  }, [id]);

  return (
    <LectureStudentWrapper>
      {students.map((student, index) => (
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
      <StudentPlusIcon />
      <Line />
    </LectureStudentWrapper>
  );
};

const LectureStudentWrapper = styled(ColumnDiv)`
  overflow: auto;
`;

const StudentWrapper = styled(RowDiv)`
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
  width: 90%;
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
