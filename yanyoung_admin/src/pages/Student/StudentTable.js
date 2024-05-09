import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../style/theme";
import { MainDiv } from "../../style/CommonStyle";
import { getAllStudentAPI } from "../../API/StudentAPI";
import PaginationComponent from "../../components/Pagination";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const studentColumns = [
    { key: "index", label: "순번" },
    { key: "name", label: "이름" },
    { key: "school", label: "학교" },
    { key: "grade", label: "학년" },
    { key: "studentPhoneNumber", label: "학생 연락처" },
    { key: "parentPhoneNumber", label: "부모님 연락처" },
    { key: "id", label: "학번" },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("currentPage: " + currentPage);
        const response = await getAllStudentAPI(currentPage);
        setStudents(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, [currentPage]);

  const handlePageChange = ({ pageNumber }) => {
    console.log ("PageNumber: " + pageNumber);
    setCurrentPage(pageNumber);
  };
  
  useEffect (() => {
    console.log (currentPage);
  }, [currentPage]);
  return (
    <MainDiv>
      <ThemeProvider theme={theme}></ThemeProvider>
      <Container>
        <div>학생 수 : {totalElements}</div>
        <h1>학생 목록</h1>
        <StyledTable>
          <thead>
            <tr>
              {studentColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                {studentColumns.map((column) =>
                  column.key === "index" ? (
                    <td key={column.key}>{index + 1}</td>
                  ) : (
                    <td key={column.key}>{student[column.key]}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <PaginationContainer>
          <PaginationComponent
            pageCount={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PaginationContainer>
      </Container>
    </MainDiv>
  );
};

const Container = styled.div`

`;

const StyledTable = styled.table`

`;

const PaginationContainer = styled.div`

`;

export default StudentTable;
