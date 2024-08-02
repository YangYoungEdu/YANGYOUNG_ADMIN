import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GenericTable from "../../components/General/GenericTable";
import StudentSearch from "../../components/Student/StudentSearch";
import { MainDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";
import { useRecoilState } from "recoil";
import { isHiddenState, isUnregisteredState } from "../../Atom";

const StudentPage = () => {
  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchDataCount, setSearchDataCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState({
    nameList: [],
    schoolList: [],
    gradeList: [],
  });
  const [isHidden, setIsHidden] = useRecoilState(isHiddenState);
  const [isUnregistered, setIsUnregistered] =
    useRecoilState(isUnregisteredState);

  return (
    <MainDiv>
      <ThemeProvider theme={theme}>
        {/* 검색 영역 */}
        {!isHidden&& !isUnregistered &&
          <StudentSearch
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        }
        {/* 테이블 */}
        <GenericTable 
        searchData={searchData}
        setSearchData={setSearchData}
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        searchDataCount={searchDataCount}
        setSearchDataCount={setSearchDataCount}
        searchKeyword={searchKeyword}
        />
      </ThemeProvider>
    </MainDiv>
  );
};

export default StudentPage;
