import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import { MainDiv } from "../../style/CommonStyle";
import StudentSearch from "../../components/Student/StudentSearch";
import GenericTable from "../../components/General/GenericTable";

const StudentPage = () => {
  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);

  return (
    <MainDiv>
      <ThemeProvider theme={theme}>
        {/* 검색 영역 */}
        <StudentSearch isEditing={isEditing} setIsEditing={setIsEditing}/>
        {/* 테이블 */}
        <GenericTable isEditing={isEditing} />
      </ThemeProvider>
    </MainDiv>
  );
};

export default StudentPage;
