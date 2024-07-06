import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { getAttendanceByLectureAndDateAPI } from "../../API/AttendanceAPI";
import { getStudentByLectureAPI } from "../../API/StudentAPI";
import { getLectureTaskAPI } from "../../API/TaskAPI";
import { ReactComponent as Cancel } from "../../Assets/Cancel.svg";
import { ReactComponent as Plus } from "../../Assets/Plus.svg";
import {ReactComponent as File} from "../../Assets/File.svg";
import { ColumnDiv, MainDiv, RowDiv } from "../../style/CommonStyle";
import { theme } from "../../style/theme";

const LectureDetail = ({
  setIsClicked,
  setSelectedLecture,
  selectedLecture,
}) => {
  const id = selectedLecture.id;
  const today = new Date().toLocaleDateString("en-CA");
  const [students, setStudents] = useState(null);
  const [attendances, setAttendances] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [onClicked, setOnClicked] = useState({
    student: true,
    attendance: false,
    assignment: false,
    material: false,
  });

  const taskDummy = [
    {
      content: "과제1",
      taskType: "전체과제",
      taskDate: "2021-09-01",
    },
    {
      content: "과제2",
      taskType: "전체과제",
      taskDate: "2021-09-01",
    },
    {
      content: "과제3",
      taskType: "전체과제",
      taskDate: "2021-09-01",
    },
  ];

  useEffect(() => {
    console.log(selectedLecture);

    getStudentByLectureAPI(id).then((res) => {
      setStudents(res);
      console.log(res);
    });
    getAttendanceByLectureAndDateAPI(id, today).then((res) => {
      setAttendances(res);
      console.log(res);
    });
    getLectureTaskAPI(id).then((res) => {
      setTasks(res);
      console.log(res);
    });
  }, [selectedLecture]);

  // 오전/오후 구분 함수
  const convertTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);

    if (hourNum < 12) {
      return `오전${time}`;
    } else {
      const adjustedHour = hourNum === 12 ? 12 : hourNum - 12;
      return `오후${adjustedHour}:${minute}`;
    }
  };

  const convertDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}월 ${day}일`;
  };

  const handleButtonClick = (type) => {
    setOnClicked((prevState) => ({
      ...prevState,
      student: type === "student" ? true : false,
      attendance: type === "attendance" ? true : false,
      assignment: type === "assignment" ? true : false,
      material: type === "material" ? true : false,
    }));
  };

  const handleCancelIsClicked = () => {
    setIsClicked(false);
    setSelectedLecture(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <LectureDetailWrapper>
        {/* 수업 정보 */}
        <TitleWrapper>
          <Title>{selectedLecture.name}</Title>
          <X onClick={() => handleCancelIsClicked()} />
        </TitleWrapper>
        <InfoWrapper>
          <Info>
            <Key>수업시간</Key>
            <Value>
              {/* {convertTime(lecture.startTime)} ~ {convertTime(lecture.endTime)} */}
            </Value>
          </Info>
          <Info>
            <Key>선생님</Key>
            <Value>{selectedLecture.teacher}</Value>
          </Info>
          <Info>
            <Key>강의실</Key>
            <Value>{selectedLecture.room}</Value>
          </Info>
        </InfoWrapper>

        {/* 학생, 출석, 과제 버튼*/}
        <ButtonWrapper>
          <Button
            isActive={onClicked.student}
            onClick={() => handleButtonClick("student")}
          >
            학생
          </Button>
          <Button
            isActive={onClicked.attendance}
            onClick={() => handleButtonClick("attendance")}
          >
            출석 체크
          </Button>
          <Button
            isActive={onClicked.assignment}
            onClick={() => handleButtonClick("assignment")}
          >
            과제
          </Button>
          <Button
            isActive={onClicked.material}
            onClick={() => handleButtonClick("material")}
          >
            {" "}
            자료
          </Button>
        </ButtonWrapper>

        {/* ToDo: 조건에 따라 정보 표시 */}
        {/* 강의별 학생 목록*/}
        {onClicked.student && students && (
          <ColumnDiv>
            {students.map((student, index) => (
              <ColumnDiv key={index}>
                <StudentWrapper key={index}>
                  <StudentName>{student.name}</StudentName>
                  <SchoolAndGrade>
                    {student.school} l {student.grade}
                  </SchoolAndGrade>
                </StudentWrapper>
                <Line />
              </ColumnDiv>
            ))}
            <StudentPlusIcon />
            <Line />
          </ColumnDiv>
        )}

        {/* 강의별 출석 목록*/}
        {onClicked.attendance && attendances && (
          // <ColumnDiv>
          <TableWrapper>
            <AttendanceTable>
              <thead>
                <tr>
                  <TableHeader style={{ width: "164px" }}>이름</TableHeader>
                  <TableHeader style={{ width: "174px" }}>
                    학생 연락처
                  </TableHeader>
                  <TableHeader>출결</TableHeader>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance, index) => (
                  <tr key={index}>
                    <TableCell>{attendance.name}</TableCell>
                    <TableCell>{attendance.studentPhoneNumber}</TableCell>
                    <TableCell>
                      <RadioWrapper>
                        <label>
                          <RadioInput
                            type="radio"
                            name="attendance"
                            value="출석"
                          />
                          출석
                        </label>
                        <RadioLabel>
                          <RadioInput
                            type="radio"
                            name="attendance"
                            value="지각"
                          />
                          지각
                        </RadioLabel>
                        <label>
                          <RadioInput
                            type="radio"
                            name="attendance"
                            value="결석"
                          />
                          결석
                        </label>
                      </RadioWrapper>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </AttendanceTable>
          </TableWrapper>
          // </ColumnDiv>
        )}

        {/* 강의별 과제 목록*/}
        {onClicked.assignment && (
          <TaskWrapper>
            {taskDummy.map((task, index) => (
              <TaskBox key={index}>
                <TaskTitleWrapper>
                  <TaskTitle>{task.content}</TaskTitle>
                  <TaskType>{task.taskType}</TaskType>
                </TaskTitleWrapper>
                <TaskDate>마감일: {convertDate(task.taskDate)}</TaskDate>
              </TaskBox>
            ))}
            <TaskBox>
              <TaskPlusIcon />
            </TaskBox>
          </TaskWrapper>
        )}
        {/* 강의별 자료 목록 */}
        {/* ToDo: 강의별 자료 목록 API 연동 */}
        {onClicked.material && (
          <TaskWrapper>
          {taskDummy.map((task, index) => (
            <TaskBox key={index}>
              <TaskTitleWrapper>
                <TaskTitle>{task.content}</TaskTitle>
                <FileIcon />
              </TaskTitleWrapper>
              <TaskDate>{convertDate(task.taskDate)}</TaskDate>
            </TaskBox>
          ))}
          <TaskBox>
            <TaskPlusIcon />
          </TaskBox>
        </TaskWrapper>
        )}
      </LectureDetailWrapper>
    </ThemeProvider>
  );
};

const LectureDetailWrapper = styled(MainDiv)`
  position: absolute;
  top: 0;
  left: ${({ isClicked }) =>
    isClicked ? "25vw" : "100vw"}; // ToDo: 여백 생기는 문제 해결
  width: 50vw;
  height: 100%; // ToDo: 높이 확인 필요
  border: 1px solid ${({ theme }) => theme.colors.gray_004};
  transition: left 0.5s ease-in-out;
  transform: ${({ isClicked }) =>
    isClicked ? "translateX(-50vw)" : "translateX(-100%)"};
  z-index: 2;
  background-color: white;
`;

const InfoWrapper = styled(ColumnDiv)`
  padding-left: 12%;
`;

const Info = styled.div`
  justify-content: none;
  margin-bottom: 17px;
`;

const TitleWrapper = styled(RowDiv)`
  /* width: 80%; */
  padding-left: 12%;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.fontSizes.title2};
  font-weight: 700;
  margin-bottom: 30px;
`;

const X = styled(Cancel)`
  display: flex;
  justify-content: flex-end;
  margin-right: 13%;
  cursor: pointer;
`;

const Key = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  margin-right: 10px;
`;

const Value = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.colors.gray_001};
`;

const Button = styled.button`
  width: 25%;
  height: 100%;
  border-radius: 5px;
  margin: 0 3px;
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  text-align: center;
  font-weight: 700;
  cursor: pointer;

  background-color: ${(props) =>
    props.isActive ? "#95C25C" : props.theme.colors.gray_001};
  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.black};

  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StudentWrapper = styled(RowDiv)`
  justify-content: flex-start;
  padding-left: 8%;
  margin: 9px 0;
`;
const StudentName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  padding-right: 18px;
`;

const SchoolAndGrade = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const Line = styled.hr`
  width: 90%;
  border: none;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray_003};
`;

const PlusIcon = styled(Plus)`
  width: 14px;
  height: 14px;
  padding-left: 48%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StudentPlusIcon = styled(PlusIcon)`
  margin: 10px 0px 10px 0px;
`;

const TableWrapper = styled.div`
  width: 90%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  margin-bottom: 20px;
  /* overflow: hidden; */
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const AttendanceTable = styled(Table)`
  tbody tr:last-child ${TableCell}:first-child {
    border-bottom-left-radius: 10px;
  }

  tbody tr:last-child ${TableCell}:last-child {
    border-bottom-right-radius: 10px;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  width: 12px;
  height: 12px;
  border: 0.5px solid #95c25c;
  border-radius: 50%;
  outline: none;
  margin-left: 16px;
  margin-right: 3px;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    display: block;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background-color: #95c25c;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &:checked::after {
    opacity: 1;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

const TaskWrapper = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column; */
  /* align-items: center; */
  padding-left: 9.5%;
`;
const TaskBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 86px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 2.5px 0px;
  padding: 18.5px 0 0 23px;
  box-sizing: border-box;
`;

const TaskPlusIcon = styled(PlusIcon)`
  margin: 20px 0px 0px -10px;
  /* margin-top: 20px; */
`;

const TaskTitleWrapper = styled.div`
  display: flex;
  padding-bottom: 9px;
  padding-top: 2px;
  /* height: 20px; */
`;

const TaskTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText3};
  font-weight: 700;
  padding-right: 9px;
`;

const TaskType = styled.div`
  width: 57px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.yellow};
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
  text-align: center;
`;

const TaskDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.bodyText4};
  font-weight: 400;
`;

const FileIcon = styled(File)`
  width: 10px;
  height: 15px;
  padding-top: 2.5px;
`;

export default LectureDetail;
