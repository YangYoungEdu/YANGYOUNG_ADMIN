import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import {
  getAllStudentAPI,
  getHiddenStudentAPI,
  searchStudentAPI,
  getUnregisteredStudentAPI,
} from "../../API/StudentAPI";
import {
  currentPageState,
  isHiddenState,
  selectedStudentState,
  totalPageState,
  isUnregisteredState,
} from "../../Atom";
import { MainDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";
import PaginationComponent from "../General/Pagination";
import TableMenus from "../Student/TableMenus";

const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
  { key: "studentPhoneNumber", label: "학생 연락처" },
  { key: "parentPhoneNumber", label: "부모님 연락처" },
  { key: "id", label: "학번" },
];

const GenericTable = ({
  isEditing,
  setIsEditing,
  searchData,
  setSearchData,
  setSearchDataCount,
  searchDataCount,
  searchKeyword,
}) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedStudentState);
  const [isHidden, setIsHidden] = useRecoilState(isHiddenState);
  const [isUnregistered, setIsUnregistered] =
    useRecoilState(isUnregisteredState);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTableData();
  }, [currentPage, searchKeyword, isUnregistered]);

  const fetchTableData = async () => {
    let response;

    // searchData. nameList, gradeList, schoolList가 모두 비어있늕 ㅣ확인 하는 변수
    const isSearchKeywordEmpty = Object.values(searchKeyword).every(
      (value) => value.length === 0
    );
    if (isUnregistered) {
      console.log("미등록 학생 조회");
      response = await getUnregisteredStudentAPI();
    } else if (isSearchKeywordEmpty) {
      if (isHidden) {
        console.log("숨김 학생 조회");
        response = await getHiddenStudentAPI(currentPage);
      } else {
        console.log("전체 학생 조회");
        response = await getAllStudentAPI(currentPage);
      }
    } else {
      console.log("검색 학생 조회");
      const nameList = searchKeyword.nameList.join(",");
      const schoolList = searchKeyword.schoolList.join(",");
      const gradeList = searchKeyword.gradeList.join(",");
      response = await searchStudentAPI(
        nameList,
        schoolList,
        gradeList,
        currentPage
      );
    }
    if (!isUnregistered) {
      console.log(response.content);
      setSearchData(response.content);
      setTotalPage(response.totalPages);
      setSearchDataCount(response.totalElements);
      console.log(response.totalElements);
    } else {
      console.log(response);
      setSearchData(response);
      setSearchDataCount(response.length);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const moveToStudentDetail = (id) => {
    if (!isEditing) {
      navigate(`/student/${id}`);
    }
  };

  const handleCheckboxChange = (id) => {
    console.log("id 확인", id);
    setSelectedStudent((prevSelectedStudent) => {
      if (prevSelectedStudent.includes(id)) {
        console.log("있음");
        // 배열에서 해당 id를 제거
        return prevSelectedStudent.filter((studentId) => studentId !== id);
      } else {
        console.log("없음");
        // 배열에 해당 id를 추가
        return [...prevSelectedStudent, id];
      }
    });
  };

  return (
    <MainDiv>
      <ThemeProvider theme={theme}>
        {/* 버튼 영역 */}
        <TableMenus
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsHidden={setIsHidden}
          isHidden={isHidden}
          searchDataCount={searchDataCount}
        />
        <Container>
          <StyledTable cellSpacing={0}>
            <StyledThead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </StyledThead>
            <StyledTbody>
              {searchData &&
                searchData.map((item, index) => {
                  const isSelected = selectedStudent.includes(item.id);
                  return (
                    <tr
                      key={index}
                      onClick={() => moveToStudentDetail(item.id)}
                    >
                      {columns.map((column) =>
                        column.key === "index" ? (
                          <td key={column.key}>{index + 1}</td>
                        ) : column.key === "name" && isEditing ? (
                          <td key={column.key}>
                            <CheckboxContainer>
                              <CustomCheckbox
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleCheckboxChange(item.id)}
                              />
                              <span>{item[column.key]}</span>
                            </CheckboxContainer>
                          </td>
                        ) : (
                          <td key={column.key}>{item[column.key]}</td>
                        )
                      )}
                    </tr>
                  );
                })}
            </StyledTbody>
          </StyledTable>
          {!isUnregistered && (
            <>
              <PaginationContainer>
                <PaginationComponent
                  pageCount={totalPage}
                  currentPage={currentPage}
                  setCurrentPage={handlePageChange}
                />
              </PaginationContainer>
            </>
          )}
        </Container>
      </ThemeProvider>
    </MainDiv>
  );
};

const Container = styled.div``;

const StyledTable = styled.table`
  width: 1050px;
  margin-bottom: 34px;
`;

const StyledThead = styled.thead`
  height: 48px;

  th {
    background: ${(props) => props.theme.colors.primary_light};
    border-left: 1px solid white;
    border-right: 1px solid white;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_002};
    width: 200px; // 기본 너비 설정
  }

  th:first-child {
    border-radius: 10px 0 0 0;
    border-left: 1px solid ${(props) => props.theme.colors.primary_light};
    width: 80px;
  }

  th:last-child {
    border-radius: 0 10px 0 0;
    border-right: 1px solid ${(props) => props.theme.colors.primary_light};
    width: 156px;
  }

  th:nth-child(2) {
    width: 134px;
  }

  th:nth-child(4) {
    width: 80px;
  }
`;

const StyledTbody = styled.tbody`
  tr {
    height: 50px;
    cursor: pointer;
  }
  td {
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.gray_002};
  }
`;

const PaginationContainer = styled.div`
  margin-bottom: 147px;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 8px;
    cursor: pointer;
  }
`;

const CustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? "#15521D" : "#fff")};
  border-radius: 100px;
  transition: all 150ms;
  border: ${(props) => (props.checked ? "3px" : "2px")};
  border-style: solid;
  border-color: #bababa;
  position: relative;
  box-sizing: border-box;
`;

export default GenericTable;
