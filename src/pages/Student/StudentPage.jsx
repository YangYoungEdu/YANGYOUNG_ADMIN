import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GenericTable from "../../components/General/GenericTable";
import StudentSearch from "../../components/Student/StudentSearch";
import { MainDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";

const StudentPage = () => {
  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState({
    nameList: [],
    schoolList: [],
    gradeList: [],
  });

  return (
    <MainDiv>
      <ThemeProvider theme={theme}>
        {/* 검색 영역 */}
        <StudentSearch
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        {/* 테이블 */}
        <GenericTable isEditing={isEditing} setIsEditing={setIsEditing} />
      </ThemeProvider>
    </MainDiv>
  );
};

export default StudentPage;
