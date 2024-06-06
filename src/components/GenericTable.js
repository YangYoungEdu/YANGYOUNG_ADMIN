import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { MainDiv } from "../style/CommonStyle";
import { theme } from "../style/theme";
import PaginationComponent from "../components/Pagination";
import { useRecoilState } from "recoil";
import {
  getAllStudentAPI,
  getHiddenStudentAPI,
} from "../API/StudentAPI";
import {
  totalElementsState,
  selectedStudentState,
  isHiddenState,
} from "../Atom";

// 테이블 컬럼 정의
const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
  { key: "studentPhoneNumber", label: "학생 연락처" },
  { key: "parentPhoneNumber", label: "부모님 연락처" },
  { key: "id", label: "학번" },
];

const GenericTable = ({ isEditing }) => {
  // 보관함이 아닌 경우의 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 보관함인 경우의 현재 페이지 상태
  const [hiddenCurrentPage, setHiddenCurrentPage] = useState(1);

  // 데이터와 총 페이지 상태
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // 전역 상태
  const [totalElements, setTotalElements] = useRecoilState(totalElementsState);
  const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);
  const [isHidden, setIsHidden] = useRecoilState(isHiddenState);

  const navigate = useNavigate();

  // 데이터 fetch
  useEffect(() => {
    const fetchTableData = async () => {
      console.log("보관함인가요? " + isHidden);
      try {
        let response;
        if (isHidden) {
          response = await getHiddenStudentAPI(hiddenCurrentPage);
        } else {
          response = await getAllStudentAPI(currentPage);
        }
        setData(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTableData();
  }, [isHidden, currentPage, hiddenCurrentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    if (isHidden) {
      setHiddenCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  // 학생 상세 페이지로 이동
  const moveToStudentDetail = (id) => {
    if (!isEditing) {
      navigate(`/student/${id}`);
    }
  };

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (id) => {
    setSelectedStudent((prevSelectedStudent) => {
      if (prevSelectedStudent.includes(id)) {
        return prevSelectedStudent.filter((studentId) => studentId !== id);
      } else {
        return [...prevSelectedStudent, id];
      }
    });
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
              {data &&
                data.map((item, index) => {
                  const isSelected = selectedStudent.includes(item.id);
                  return (
                    <tr key={index} onClick={() => moveToStudentDetail(item.id)}>
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
                                onClick={(e) => e.stopPropagation()} // Prevent row click event
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
              pageCount={totalPages}
              currentPage={isHidden ? hiddenCurrentPage : currentPage}
              setCurrentPage={handlePageChange}
            />
          </PaginationContainer>
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
