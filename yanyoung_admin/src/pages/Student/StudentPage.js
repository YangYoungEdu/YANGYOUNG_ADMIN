import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import { MainDiv } from "../../style/CommonStyle";
import StudentSearch from "./StudentSearch";
import { getAllStudentAPI } from "../../API/StudentAPI";
import StudentTable from "./StudentTable";

const StudentPage = () => {
  return (
    <MainDiv>
      <ThemeProvider theme={theme}>
        {/* 검색 영역 */}
        <SearchArea>
            <StudentSearch />
        </SearchArea>

        {/* 테이블 영역 */}
        <div>
          {/* 테이블 메뉴들 */}
          <div></div>
          {/* 테이블 */}
          <StudentTable />
        </div>
      </ThemeProvider>
    </MainDiv>
  );
};

const SearchArea = styled.div`
margin-bottom: 65px;
`;

export default StudentPage;
