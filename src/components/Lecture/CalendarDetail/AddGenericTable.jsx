import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import {
  getAllStudentAPI,
  getHiddenStudentAPI,
  searchStudentAPI,
} from "../../../API/StudentAPI";
import { MainDiv } from "../../../style/CommonStyle";
import { theme } from "../../../style/theme";
import PaginationComponent from "../../General/Pagination";
import TableMenus from "../../Student/TableMenus";
import { useAddFormState } from "../../../stores/addFormState";

const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
];

const AddGenericTable = ({
  searchData,
  setSearchData,
  setSearchDataCount,
  searchKeyword,
  handleCheckboxChange,
  selectedStudent,
  active,
  setSelectedStudent
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [addFormState, setAddFormState] = useAddFormState();

  useEffect(() => {
    fetchTableData();
  }, [currentPage, searchKeyword]);

  useEffect(() => {
    if(active){
      const { studentList} = addFormState;

      setSelectedStudent(studentList);
    }
  }, []);

  const fetchTableData = async () => {
    let response;

    // searchData. nameList, gradeList, schoolList가 모두 비어있늕 ㅣ확인 하는 변수
    const isSearchKeywordEmpty = Object.values(searchKeyword).every(
      (value) => value.length === 0
    );
    if (isSearchKeywordEmpty) {
      if (isHidden) {
        console.log("숨김 학생 조회");
        response = await getHiddenStudentAPI(currentPage);
      }
      if (!isHidden) {
        console.log("전체 학생 조회");
        response = await getAllStudentAPI(currentPage);
      }
    }
    if (!isSearchKeywordEmpty) {
      console.log("검색 학생 조회");
      const nameList = searchKeyword.nameList.join(",");
      const schoolList = searchKeyword.schoolList.join(",");
      const gradeList = searchKeyword.gradeList.join(",");
      response = await searchStudentAPI(nameList, schoolList, gradeList, currentPage);
    }

    // console.log(response.content);

    setSearchData(response.content);
    setTotalPage(response.totalPages);
    setSearchDataCount(response.totalElements);
    console.log(response.totalElements);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MainDiv>
      <ThemeProvider theme={theme}>

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
                    >
                      {columns.map((column) =>
                        column.key === "index" ? (
                          <td key={column.key}>{index + 1}</td>
                        ) : column.key === "name" && true ? (
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
          <PaginationContainer>
            <PaginationComponent
              pageCount={totalPage}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </PaginationContainer>
        </Container>
      </ThemeProvider>
    </MainDiv>
  );
};

const Container = styled.div`
width: 100%`;

const StyledTable = styled.table`
  width: 100%;
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

export default AddGenericTable;
