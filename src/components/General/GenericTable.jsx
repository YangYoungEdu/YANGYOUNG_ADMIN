import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { MainDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";
import PaginationComponent from "../General/Pagination";
import { useRecoilState } from "recoil";
import {
  currentPageState,
  totalPageState,
  dataState,
  selectedStudentState
} from "../../Atom";

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
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [data, setData] = useRecoilState(dataState);
  const [selectedStudent, setSelectedStudent] = useRecoilState(selectedStudentState);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const moveToStudentDetail = (id) => {
    if (!isEditing) {
      navigate(`/student/${id}`);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedStudent((prevSelectedStudent) =>{
      if (prevSelectedStudent.includes(id)){
        return prevSelectedStudent.filter((id) => id !== id);
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
