import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import StudentSearch from "./StudentSearch";
import { MainDiv } from "../../style/CommonStyle";
import { getAllStudentAPI } from "../../API/StudentAPI";
import DropdownExample from "./StudentSearch";
const StudentPage = () => {
  const studentColumns = [
    { key: "index", label: "순번" },
    { key: "name", label: "이름" },
    { key: "school", label: "학교" },
    { key: "grade", label: "학년" },
    { key: "studentPhoneNumber", label: "학생 연락처" },
    { key: "parentPhoneNumber", label: "부모님 연락처" },
    { key: "id", label: "학번" },
  ];

  useEffect (() => {
    getAllStudentAPI();
  }, []);

  return (
    <MainDiv>
      <ThemeProvider theme={theme}>
        {/* 검색 영역 */}
        <SearchArea>
            <DropdownExample />
        </SearchArea>

        {/* 테이블 영역 */}
        <div>
          {/* 테이블 메뉴들 */}
          <div></div>

          {/* 테이블 */}
          <StyledTable>
            <thead>
              <tr>
                {studentColumns.map((column) => (
                  <StyledTh>{column.label}</StyledTh>
                ))}
              </tr>
            </thead>

            <tbody>
              {studentColumns.map((student, index) => (
                <StyledTr key={index}>
                  {studentColumns.map((column) => (
                    <StyledTd key={column.key}>
                      {column.key === "index"
                        ? index + 1
                        : column.key === "name"
                        ? student.name
                        : column.key === "school"
                        ? student.school
                        : column.key === "grade"
                        ? student.grade
                        : column.key === "studentPhoneNumber"
                        ? student.studentPhoneNumber
                        : column.key === "parentPhoneNumber"
                        ? student.parentPhoneNumber
                        : column.key === "id"
                        ? student.id
                        : ""}
                    </StyledTd>
                  ))}
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </ThemeProvider>
    </MainDiv>
  );
};

const SearchArea = styled.div``;


const StyledTable = styled.table`
  margin-top: 204px;
  border-radius: 10px;
  width: 1050px;
`;

const StyledTh = styled.th`
width: 1050px;
box-sizing: border-box;
background: ${(props)=> props.theme.colors.primary_light};
padding: 14.5px;
text-align: center;
`;

const StyledTd = styled.td`

`;

const StyledTr = styled.tr`

`;
export default StudentPage;
